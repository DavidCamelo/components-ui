import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button/Button';
import { Table } from '../table/Table';
import { Modal } from '../modal/Modal';
import { ConfirmationModal } from '../confirmation-modal/ConfirmationModal';
import { Form } from '../form/Form';
import { Alert } from '../alert/Alert';
import './resource-page.css';

export const ResourcePage = ({ title, resourceName, service, columns, formFields }) => {
  const [data, setData] = useState([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageError, setPageError] = useState(null);
  const [formError, setFormError] = useState(null);

  // Effect to auto-clear page-level errors
  useEffect(() => {
    if (pageError) {
      const timer = setTimeout(() => setPageError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [pageError]);

  // Effect to auto-clear form-level errors
  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => setFormError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

  const fetchData = async () => {
    try {
      setPageError(null);
      const response = await service.getAll();
      setData(response);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setPageError(`Could not load ${resourceName.toLowerCase()} data. Please try again later.`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = () => {
    setSelectedItem(null);
    setFormError(null);
    setIsFormModalOpen(true);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormError(null);
    setIsFormModalOpen(true);
  };

  const handleDelete = (item) => {
    setSelectedItem(item);
    setIsDeleteModalOpen(true);
  };

  const closeModals = () => {
    setIsFormModalOpen(false);
    setIsDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const handleFormSubmit = async (formData) => {
    try {
      setFormError(null);
      if (selectedItem?.id) {
        await service.update(selectedItem.id, formData);
      } else {
        await service.create(formData);
      }
      fetchData();
      closeModals();
    } catch (err) {
      console.error("Failed to submit form:", err);
      setFormError(err.message || `Failed to ${selectedItem?.id ? 'update' : 'create'} ${resourceName.toLowerCase()}. Please try again.`);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setPageError(null);
      if (selectedItem?.id) {
        await service.delete(selectedItem.id);
        fetchData();
      }
    } catch(err) {
      console.error("Failed to delete item:", err);
      setPageError(err.message || `Failed to delete ${resourceName.toLowerCase()}. Please try again.`);
    } finally {
        closeModals();
    }
  };

  return (
    <div className="resource-page">
      {pageError && (
        <div className="resource-page-error-wrapper">
          <Alert type="error" message={pageError} />
        </div>
      )}
      <div className="resource-page-header">
        <h1>{title}</h1>
        <Button primary label={`Create New ${resourceName}`} onClick={handleCreate} />
      </div>

      <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />

      {isFormModalOpen && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={closeModals}
          title={selectedItem?.id ? `Edit ${resourceName}` : `Create New ${resourceName}`}
        >
          {formError && (
            <div className="form-error-wrapper">
              <Alert type="error" message={formError} />
            </div>
           )}
          <Form
            fields={formFields}
            initialData={selectedItem}
            onSubmit={handleFormSubmit}
            onCancel={closeModals}
          />
        </Modal>
      )}

      {isDeleteModalOpen && (
        <ConfirmationModal
            isOpen={isDeleteModalOpen}
            onClose={closeModals}
            onConfirm={handleConfirmDelete}
            title={`Delete ${resourceName}`}
        >
            Are you sure you want to delete this {resourceName.toLowerCase()}? This action cannot be undone.
        </ConfirmationModal>
      )}
    </div>
  );
};

ResourcePage.propTypes = {
  title: PropTypes.string.isRequired,
  resourceName: PropTypes.string.isRequired,
  service: PropTypes.shape({
    getAll: PropTypes.func.isRequired,
    create: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
    delete: PropTypes.func.isRequired,
  }).isRequired,
  columns: PropTypes.array.isRequired,
  formFields: PropTypes.array.isRequired,
};

export default ResourcePage;
