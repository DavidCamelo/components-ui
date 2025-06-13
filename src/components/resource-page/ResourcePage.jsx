import React, { useState, useEffect } from 'react';
import { Modal } from '../modal/Modal';
import { Table } from '../table/Table';
import { Form } from '../form/Form';
import { ConfirmationModal } from '../confirmation-modal/ConfirmationModal';
import './resource-page.css';

export const ResourcePage = ({ title, resourceName, service, columns, formFields }) => {
  const [data, setData] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
        setLoading(true);
        setError(null);
        const result = await service.getAll();
        setData(result);
    } catch (error) {
        setError(error.message);
    } finally {
        setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [service]);

  const handleSave = async (item) => {
    try {
        setError(null);
        if (item.id) {
            await service.update(item.id, item);
        } else {
            await service.create(item);
        }
        fetchData();
        setIsFormModalOpen(false);
        setCurrentItem(null);
    } catch (error) {
        setError(error.message);
    }
  };

  const handleEdit = (item) => {
    setCurrentItem(item);
    setIsFormModalOpen(true);
  };

  const handleDelete = (id) => {
    setItemToDelete(id);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
        try {
            setError(null);
            await service.delete(itemToDelete);
            fetchData();
        } catch (error) {
            setError(error.message);
        } finally {
            setItemToDelete(null);
        }
    }
  };

  const handleCancel = () => {
    setIsFormModalOpen(false);
    setCurrentItem(null);
    setError(null);
  };

  if (loading) {
      return <div className="text-center p-4">Loading {resourceName}s...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <button onClick={() => { setCurrentItem({}); setIsFormModalOpen(true); }} className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">Add {resourceName}</button>
      </div>

      {error && !isFormModalOpen && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}

      <Modal isOpen={isFormModalOpen} onClose={handleCancel} title={`${currentItem?.id ? 'Edit' : 'Add'} ${resourceName}`}>
          {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">{error}</div>}
          <Form
            fields={formFields}
            initialData={currentItem}
            onSave={handleSave}
            onCancel={handleCancel}
          />
      </Modal>

      <ConfirmationModal
        isOpen={!!itemToDelete}
        onClose={() => setItemToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={`Confirm Deletion`}
      >
        Are you sure you want to delete this {resourceName.toLowerCase()}? This action cannot be undone.
      </ConfirmationModal>

      <Table columns={columns} data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};
