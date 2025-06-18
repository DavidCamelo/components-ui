import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button } from '../button/Button';
import { Table } from '../table/Table';
import { Modal } from '../modal/Modal';
import { ConfirmationModal } from '../confirmation-modal/ConfirmationModal';
import { Form } from '../form/Form';
import { Alert } from '../alert/Alert';
import { Pagination } from '../pagination/Pagination';
import { Spinner } from '../spinner/Spinner';
import './resource-page.css';

export const ResourcePage = ({ title, resourceName, service, columns, formFields }) => {
  const [data, setData] = useState([]);
  const [paginationInfo, setPaginationInfo] = useState({
    totalElements: 0,
    totalPages: 1,
    pageNumber: 1,
    pageSize: 10,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [pageError, setPageError] = useState(null);
  const [formError, setFormError] = useState(null);
  const [pageSuccess, setPageSuccess] = useState(null);

  const fetchData = async (page = 1, size = paginationInfo.pageSize) => {
    setIsLoading(true);
    try {
      setPageError(null);
      const response = await service.getAll({ pageNumber: page, pageSize: size });
      setData(response.content);
      setPaginationInfo({
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        pageNumber: response.pageable.pageNumber + 1,
        pageSize: response.size,
      });
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setPageError(`Could not load ${resourceName.toLowerCase()} data. Please try again later.`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(paginationInfo.pageNumber, paginationInfo.pageSize);
  }, [paginationInfo.pageNumber, paginationInfo.pageSize]);

  useEffect(() => {
    if (pageError || pageSuccess) {
      const timer = setTimeout(() => {
        setPageError(null);
        setPageSuccess(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [pageError, pageSuccess]);

  useEffect(() => {
    if (formError) {
      const timer = setTimeout(() => setFormError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [formError]);

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
        setPageSuccess(`${resourceName} updated successfully!`);
      } else {
        await service.create(formData);
        setPageSuccess(`${resourceName} created successfully!`);
      }
      fetchData(paginationInfo.pageNumber, paginationInfo.pageSize);
      closeModals();
    } catch (err) {
      console.error("Failed to submit form:", err);
      setFormError(err.message || `Failed to ${selectedItem?.id ? 'update' : 'create'} ${resourceName.toLowerCase()}.`);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      setPageError(null);
      if (selectedItem?.id) {
        await service.delete(selectedItem.id);
        setPageSuccess(`${resourceName} deleted successfully!`);
        if (data.length === 1 && paginationInfo.pageNumber > 1) {
            fetchData(paginationInfo.pageNumber - 1, paginationInfo.pageSize);
        } else {
            fetchData(paginationInfo.pageNumber, paginationInfo.pageSize);
        }
      }
    } catch(err) {
      console.error("Failed to delete item:", err);
      setPageError(err.message || `Failed to delete ${resourceName.toLowerCase()}.`);
    } finally {
        closeModals();
    }
  };

  return (
    <div className="resource-page">
      {pageError && <div className="resource-page-message-wrapper"><Alert type="error" message={pageError} /></div>}
      {pageSuccess && <div className="resource-page-message-wrapper"><Alert type="success" message={pageSuccess} /></div>}

      <div className="resource-page-header">
        <h1>{title}</h1>
        <Button primary label={`Create New ${resourceName}`} onClick={handleCreate} />
      </div>

      {isLoading ? (
        <div className="loading-spinner-container"><Spinner size="large" /></div>
      ) : (
        <>
            <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
            <Pagination
                currentPage={paginationInfo.pageNumber}
                totalItems={paginationInfo.totalElements}
                itemsPerPage={paginationInfo.pageSize}
                onPageChange={(page) => setPaginationInfo(p => ({...p, pageNumber: page}))}
                onItemsPerPageChange={(size) => setPaginationInfo({ ...paginationInfo, pageSize: size, pageNumber: 1 })}
            />
        </>
      )}

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
