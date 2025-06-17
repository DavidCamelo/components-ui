import React, { useState } from 'react';
import Button from './components/button/Button';
import Checkbox from './components/checkbox/Checkbox';
import ConfirmationModal from './components/confirmation-modal/ConfirmationModal';
import Header from './components/header/Header';
import Input from './components/input/Input';
import Modal from './components/modal/Modal';
import MultiSelect from './components/multi-select/MultiSelect';
import RadioButton from './components/radio-button/RadioButton';
import Select from './components/select/Select';
import Tabs from './components/tabs/Tabs';
import Toggle from './components/toggle/Toggle';
import DatePicker from './components/date-picker/DatePicker';
import TimePicker from './components/time-picker/TimePicker';
import DateTimePicker from './components/date-time-picker/DateTimePicker';
import Form from './components/form/Form';
import Table from './components/table/Table';
import Card from './components/card/Card';
import Carousel from './components/carousel/Carousel';
import './App.css';

export default function App() {
  const [textValue, setTextValue] = useState('');
  const [numberValue, setNumberValue] = useState('');
  const [checkboxValues, setCheckboxValues] = useState({ 'agrees-to-terms': true, 'receives-newsletter': false });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [selectValue, setSelectValue] = useState('tech');
  const [multiSelectValues, setMultiSelectValues] = useState(['js']);
  const [radioValue, setRadioValue] = useState('personal');
  const [toggleEnabled, setToggleEnabled] = useState(false);
  const [dateValue, setDateValue] = useState('');
  const [timeValue, setTimeValue] = useState('');
  const [datetimeValue, setDatetimeValue] = useState('');
  const [tableData, setTableData] = useState([
    { id: 1, name: 'John Doe', role: 'Developer', active: true },
    { id: 2, name: 'Jane Smith', role: 'Designer', active: false },
    { id: 3, name: 'Peter Jones', role: 'Project Manager', active: true },
  ]);

  const handleEdit = (row) => {
    alert(`Editing: ${row.name}`);
  };

  const handleDelete = (row) => {
    if (window.confirm(`Are you sure you want to delete ${row.name}?`)) {
      setTableData(prevData => prevData.filter(item => item.id !== row.id));
      alert(`${row.name} has been deleted.`);
    }
  };

  const tableColumns = [
    { name: 'Name', key: 'name' },
    { name: 'Role', key: 'role' },
    {
      name: 'Status',
      key: 'active',
      render: (item) => <Toggle enabled={item.active} setEnabled={() => {
        const newData = tableData.map(d => d.id === item.id ? {...d, active: !d.active} : d);
        setTableData(newData);
      }} />
    }
  ];

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxValues(prev => ({ ...prev, [name]: checked }));
  };

  const menuItems = [ { name: 'Home', href: '#' }, { name: 'About', href: '#' }, { name: 'Services', href: '#' }, { name: 'Contact', href: '#' } ];
  const selectOptions = [ { value: 1, label: 'Type 1' }, { value: 2, label: 'Type 2' } ];
  const multiSelectOptions = [ { value: 1, label: 'js' }, { value: 2, label: 'py' }, { value: 3, label: 'java' } ];
  const tabsData = [ { name: 'Profile', content: <div>Profile content goes here.</div> }, { name: 'Dashboard', content: <div>Dashboard content goes here.</div> }, { name: 'Settings', content: <div>All your settings are here.</div> } ];
  const carouselItems = [
    <div style={{ width: '100%', height: '100%', backgroundColor: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>Slide 1</div>,
    <div style={{ width: '100%', height: '100%', backgroundColor: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>Slide 2</div>,
    <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem' }}>Slide 3</div>,
  ];

  const formFields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'e.g., Jane Doe' },
    { label: 'Age', name: 'age', type: 'number' },
    { label: 'Type', name: 'type', options: selectOptions, type: 'select' },
    { label: 'Tech Stack', name: 'tech', options: multiSelectOptions, type: 'multiSelect' },
    { label: 'Subscribe', name: 'subscribe', type: 'toggle' }
  ];

  const initialFormData = {
    name: 'John Doe',
    age: 35,
    type: { id: 2, type: 'Type 2' },
    tech: [{id: 1, name: 'js'}, {id:3, name: 'java'}],
    subscribe: true,
  };

  const handleFormSubmit = (formData) => {
    alert('Form Submitted!\n' + JSON.stringify(formData, null, 2));
  };

  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <Header title="ComponentLib" menuItems={menuItems} />
      <main style={{ padding: '2rem', background: '#f9fafb' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>

              <Card title="Inputs & Buttons">
                  <Input label="Text Input" name="textInput" placeholder="Enter some text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                  <Input label="Number Input" type="number" name="numberInput" placeholder="Enter a number" value={numberValue} onChange={(e) => setNumberValue(e.target.value)} />
                  <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem', alignItems: 'flex-start' }}>
                      <Button primary label="Primary" onClick={() => alert('Primary button clicked!')} />
                      <Button label="Secondary" onClick={() => alert('Secondary button clicked!')} />
                      <Button label="Danger" backgroundColor="hsl(0, 79%, 63%)" primary onClick={() => alert('Danger button clicked!')} />
                  </div>
              </Card>

              <Card title="Selection Controls">
                  <Select label="Category" name="category" options={selectOptions} value={selectValue} onChange={(e) => setSelectValue(e.target.value)} />
                  <MultiSelect label="Technologies" options={multiSelectOptions} selectedValues={multiSelectValues} onChange={setMultiSelectValues} />
                  <div>
                      <span style={{display: 'block', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '4px'}}>Account Type</span>
                      <div style={{display: 'flex', gap: '1rem'}}>
                      <RadioButton label="Personal" name="accountType" value="personal" checked={radioValue === 'personal'} onChange={(e) => setRadioValue(e.target.value)} />
                      <RadioButton label="Business" name="accountType" value="business" checked={radioValue === 'business'} onChange={(e) => setRadioValue(e.target.value)} />
                      </div>
                  </div>
              </Card>

              <Card title="Toggles & Modals">
                  <Toggle label="Enable Feature" enabled={toggleEnabled} setEnabled={setToggleEnabled} />
                  <Checkbox label="I agree to the terms" name="agrees-to-terms" checked={checkboxValues['agrees-to-terms']} onChange={handleCheckboxChange} />
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <Button label="Open Modal" onClick={() => setIsModalOpen(true)} />
                      <Button label="Confirm Action" primary onClick={() => setIsConfirmModalOpen(true)} />
                  </div>
              </Card>

              <Card title="Date & Time Pickers">
                  <DatePicker label="Appointment Date" name="appointment-date" value={dateValue} onChange={e => setDateValue(e.target.value)} />
                  <TimePicker label="Appointment Time" name="appointment-time" value={timeValue} onChange={e => setTimeValue(e.target.value)} />
                  <DateTimePicker label="Event Date and Time" name="event-datetime" value={datetimeValue} onChange={e => setDatetimeValue(e.target.value)} />
              </Card>

              <Card title="Carousel" className="storybook-card-full-width">
                  <Carousel items={carouselItems} autoPlayInterval={4000} />
              </Card>

              <Card title="Reusable Table" className="storybook-card-full-width">
                  <Table
                      columns={tableColumns}
                      data={tableData}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                  />
              </Card>

              <Card title="Dynamic Form" className="storybook-card-full-width">
                  <Form
                      fields={formFields}
                      initialData={initialFormData}
                      onSubmit={handleFormSubmit}
                      onCancel={() => alert('Form cancelled!')}
                  />
              </Card>

              <Card title="Tabs" className="storybook-card-full-width">
                  <Tabs tabs={tabsData} />
              </Card>

          </div>
      </main>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Generic Modal">
          <p style={{ color: '#4b5563' }}>This is a generic modal component. You can put any content you want here.</p>
      </Modal>

      <ConfirmationModal isOpen={isConfirmModalOpen} onClose={() => setIsConfirmModalOpen(false)} onConfirm={() => alert('Action was confirmed!')} title="Confirm Action">
          Are you sure you want to perform this action?
      </ConfirmationModal>
    </div>
  );
}