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

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCheckboxValues(prev => ({ ...prev, [name]: checked }));
  };

  const menuItems = [ { name: 'Home', href: '#' }, { name: 'About', href: '#' }, { name: 'Services', href: '#' }, { name: 'Contact', href: '#' } ];
  const selectOptions = [ { value: 'tech', label: 'Technology' }, { value: 'health', label: 'Health' }, { value: 'finance', label: 'Finance' } ];
  const multiSelectOptions = [ { value: 'js', label: 'JavaScript' }, { value: 'py', label: 'Python' }, { value: 'rb', label: 'Ruby' }, { value: 'go', label: 'Go' } ];
  const tabsData = [ { name: 'Profile', content: <div>Profile content goes here.</div> }, { name: 'Dashboard', content: <div>Dashboard content goes here.</div> }, { name: 'Settings', content: <div>All your settings are here.</div> } ];

  return (
    <div style={{fontFamily: 'sans-serif'}}>
      <Header title="ComponentLib" menuItems={menuItems} />
      <main style={{ padding: '2rem', background: '#f9fafb' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Inputs & Buttons</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <Input label="Text Input" name="textInput" placeholder="Enter some text" value={textValue} onChange={(e) => setTextValue(e.target.value)} />
                      <Input label="Number Input" type="number" name="numberInput" placeholder="Enter a number" value={numberValue} onChange={(e) => setNumberValue(e.target.value)} />
                      <div style={{ display: 'flex', gap: '0.5rem', paddingTop: '0.5rem', alignItems: 'flex-start' }}>
                          <Button primary label="Primary" onClick={() => alert('Primary button clicked!')} />
                          <Button label="Secondary" onClick={() => alert('Secondary button clicked!')} />
                          <Button label="Danger" backgroundColor="hsl(0, 79%, 63%)" primary onClick={() => alert('Danger button clicked!')} />
                      </div>
                  </div>
              </div>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Selection Controls</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <Select label="Category" name="category" options={selectOptions} value={selectValue} onChange={(e) => setSelectValue(e.target.value)} />
                      <MultiSelect label="Technologies" options={multiSelectOptions} selectedValues={multiSelectValues} onChange={setMultiSelectValues} />
                      <div>
                          <span style={{display: 'block', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: '500', color: '#333', marginBottom: '4px'}}>Account Type</span>
                          <div style={{display: 'flex', gap: '1rem'}}>
                          <RadioButton label="Personal" name="accountType" value="personal" checked={radioValue === 'personal'} onChange={(e) => setRadioValue(e.target.value)} />
                          <RadioButton label="Business" name="accountType" value="business" checked={radioValue === 'business'} onChange={(e) => setRadioValue(e.target.value)} />
                          </div>
                      </div>
                  </div>
              </div>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Date & Time Pickers</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <DatePicker label="Appointment Date" name="appointment-date" value={dateValue} onChange={e => setDateValue(e.target.value)} />
                      <TimePicker label="Appointment Time" name="appointment-time" value={timeValue} onChange={e => setTimeValue(e.target.value)} />
                      <DateTimePicker label="Event Date and Time" name="event-datetime" value={datetimeValue} onChange={e => setDatetimeValue(e.target.value)} />
                  </div>
              </div>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Toggles & Modals</h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <Toggle label="Enable Feature" enabled={toggleEnabled} setEnabled={setToggleEnabled} />
                      <Checkbox label="I agree to the terms" name="agrees-to-terms" checked={checkboxValues['agrees-to-terms']} onChange={handleCheckboxChange} />
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                          <Button label="Open Modal" onClick={() => setIsModalOpen(true)} />
                          <Button label="Confirm Action" primary onClick={() => setIsConfirmModalOpen(true)} />
                      </div>
                  </div>
              </div>

              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1)', gridColumn: '1 / -1' }}>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', borderBottom: '1px solid #eee', paddingBottom: '0.5rem' }}>Tabs</h2>
                  <Tabs tabs={tabsData} />
              </div>
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
