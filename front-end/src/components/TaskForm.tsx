import React, { useEffect, useState } from 'react';
import {
    DatePicker,
    TimePicker,
    Switch,
    Input,
    Radio,
    Button,
    Select,

    Modal,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Task } from './TaskTypes';
import dayjs from 'dayjs';
import TaskIconPicker from './TaskIconPicker';
import * as Icons from '@ant-design/icons';
import './TaskForm.css';

const colors = [
    { lightTheme: '#EFE5E5', darkTheme: '#4C1A1A' }, // Complementary dark red
    { lightTheme: '#EDDFE3', darkTheme: '#4A2A33' }, // Complementary dark pink
    { lightTheme: '#DDDCE7', darkTheme: '#2A2B4A' }, // Complementary dark blue
    { lightTheme: '#D5E2ED', darkTheme: '#1F2A33' }, // Complementary dark navy
    { lightTheme: '#D0E7EA', darkTheme: '#264547' }, // Complementary dark teal
    { lightTheme: '#E0E8D8', darkTheme: '#3B4A26' }, // Complementary dark olive
    { lightTheme: '#EFE8D1', darkTheme: '#4A391A' }    // Complementary dark brown
];

const repeatFrequencies = [
    { label: 'Everyday', value: 'everyday' },
    { label: 'Weekly', value: 'weekly' },
    { label: 'Monthly', value: 'monthly' },
    { label: 'Yearly', value: 'yearly' },
];
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const daysOfMonth = Array.from({ length: 31 }, (_, i) => i + 1);
const years = Array.from({ length: 10 }, (_, i) => dayjs().year() + i);


interface TaskFormProps {
    taskToEdit: Task | null;
    onSubmit: (task: Task) => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ taskToEdit, onSubmit }) => {
    const [selectedColor, setSelectedColor] = useState<{ lightTheme: string, darkTheme: string }>(colors[3]);
    const [isRepeat, setIsRepeat] = useState(false);
    const [scheduledDate, setScheduledDate] = useState<string | null>(dayjs().format('YYYY-MM-DD'));
    const [repeatFrequency, setRepeatFrequency] = useState<'everyday' | 'yearly' | 'weekly' | 'monthly'>('weekly');
    const [repeatEndDate, setRepeatEndDate] = useState<string>('');
    const [icon, setIcon] = useState<null | { name: keyof typeof Icons, color: string }>(null);
    const [IconComponent, setIconComponent] = useState<null | React.FC>(null);
    const [visible, setVisible] = useState(false);
    const [specificTime, setSpecificTime] = useState<string | string[] | boolean | null>(false);
    const [reminder, setReminder] = useState<boolean>(true);
    const [tag, setTag] = useState('');
    const [id, setId] = useState<string | null>(Date.now().toString());
    const [subtasks, setSubtasks] = useState<string[]>([]);
    const [taskTitle, setTaskTitle] = useState('');
    const [selectedWeekdays, setSelectedWeekdays] = useState<string[]>([]);
    const [selectedDaysOfMonth, setSelectedDaysOfMonth] = useState<number[]>([]);
    const [selectedYears, setSelectedYears] = useState<number[]>([]);
    const darkTheme = localStorage.getItem("theme") === "dark";

    useEffect(() => {
        // Populate form with task data if editing
        if (taskToEdit) {
            setTaskTitle(taskToEdit.title);
            setId(taskToEdit.id);
            setSelectedColor(taskToEdit.color);
            setScheduledDate(taskToEdit.scheduledDate);
            setIsRepeat(taskToEdit.isRepeat);
            setRepeatFrequency(taskToEdit.repeatFrequency);
            setRepeatEndDate(taskToEdit.repeatEndDate);
            setSpecificTime(taskToEdit.specificTime);
            setReminder(taskToEdit.reminder);
            setTag(taskToEdit.tag);
            setSubtasks(taskToEdit.subtasks);
            setSelectedWeekdays(taskToEdit.selectedWeekdays);
            setSelectedDaysOfMonth(taskToEdit.selectedDaysOfMonth);
            setSelectedYears(taskToEdit.selectedYears);
        }

    }, [taskToEdit]);

    const addSubtask = () => setSubtasks([...subtasks, '']);

    const removeSubtask = (index: number) => {
        const newSubtasks = [...subtasks];
        newSubtasks.splice(index, 1);
        setSubtasks(newSubtasks);
    };

    const saveTask = () => {
        // Ensure the task title is not empty
        if (!taskTitle.trim()) {
            alert('Task title is required!');
            return;
        }

        const task: Task = {
            id,
            title: taskTitle,
            color: selectedColor,
            icon,
            scheduledDate,
            isRepeat,
            repeatFrequency,
            repeatEndDate,
            specificTime,
            reminder,
            tag,
            subtasks,
            selectedWeekdays,
            selectedDaysOfMonth,
            selectedYears,
        };

        onSubmit(task); // Call onSubmit with the task
    };

    const disabledDate = (current: any) => {
        // Can not select days before today and today
        return current && current <= dayjs().endOf('day');
    };

    return (
        <div className="task-form" style={{
            backgroundColor: darkTheme ? selectedColor.darkTheme : selectedColor.lightTheme, borderColor: darkTheme ? selectedColor.lightTheme : selectedColor.darkTheme
        }}>
            <div className="task-input">
                <Input
                    placeholder="New Task"
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
            </div>

            <div className="color-picker">
                {colors.map((color, index) => (
                    <div
                        key={index}
                        className={`color-circle ${selectedColor.darkTheme === color.lightTheme ? 'selected' : ''}`}
                        style={{ backgroundColor: darkTheme ? color.darkTheme : color.lightTheme, 
                            borderColor: darkTheme ? color.lightTheme : color.darkTheme }}
                        onClick={() => setSelectedColor(color)}
                    />
                ))}

                {
                    IconComponent && <span style={{ color: icon?.color, fontSize: '24px' }}><IconComponent />
                    </span>
                }

            </div>
            <div className="task-input">
                <TaskIconPicker onSelect={(name, color) => {
                    setIcon({ name, color });
                    setIconComponent(Icons[name] as React.FC);
                }} />
            </div>

            <div className="task-input">
                <DatePicker
                    onChange={(date, dateString) => setScheduledDate(dateString.toString())}
                    value={dayjs(scheduledDate)}
                    placeholder="Select a date"
                    disabled={isRepeat}
                />
                <div className="repeat-toggle space-between toggle">
                    <label>Repeat</label>
                    <Switch checked={isRepeat} onChange={() => { setIsRepeat(!isRepeat); setVisible(true); setScheduledDate(null) }} />
                </div>
                <Modal
                    title="Repeated"
                    visible={visible && isRepeat}
                    onOk={() => setVisible(false)}
                >
                    <div className="repeat-options">
                        <Radio.Group
                            options={repeatFrequencies}
                            value={repeatFrequency}
                            onChange={(e) => setRepeatFrequency(e.target.value)}
                            optionType="button"
                            buttonStyle="solid"
                        />

                        {repeatFrequency === 'weekly' && (
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select days of the week"
                                value={selectedWeekdays}
                                onChange={(value) => setSelectedWeekdays(value as string[])}
                                options={weekdays.map((day) => ({ value: day, label: day }))}
                            />
                        )}

                        {repeatFrequency === 'monthly' && (
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select days of the month"
                                value={selectedDaysOfMonth}
                                onChange={(value) => setSelectedDaysOfMonth(value as number[])}
                                options={daysOfMonth.map((day) => ({ value: day, label: `Day ${day}` }))}
                            />
                        )}

                        {repeatFrequency === 'yearly' && (
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="Select years"
                                value={selectedYears}
                                onChange={(value) => setSelectedYears(value as number[])}
                                options={years.map((year) => ({ value: year, label: `Year ${year}` }))}
                            />
                        )}
                        <DatePicker
                            defaultOpenValue={dayjs(repeatEndDate)}

                            disabledDate={disabledDate}
                            onChange={(date, dateString) => setRepeatEndDate(dayjs(date).format('DD-MM-YYYY'))}
                            placeholder="Repeat End Date"
                        />
                    </div>
                </Modal>

                {isRepeat && (
                    <div className="repeat-details">
                        {repeatFrequency === 'everyday' ? (
                            <p>Everyday</p>
                        ) : <p>Repeat on every
                            {repeatFrequency === 'weekly' && selectedWeekdays.map(weekday => {
                                return <span>{`${weekday} `}</span>
                            })}
                            {repeatFrequency === 'monthly' && selectedDaysOfMonth.map(day => {
                                return <span>{`Day ${day} `}</span>
                            })}
                            {repeatFrequency === 'yearly' && selectedYears.map(year => {
                                return <span>{`Year ${year} `}</span>
                            })}
                        </p>}

                        {repeatEndDate && <p>Repeat till {repeatEndDate}</p>}
                        <Button onClick={() => setVisible(true)}>Change Repeat Frequency</Button>
                    </div>
                )}
            </div>

            <div className="task-input">
                <div className="time-toggle space-between toggle">
                    <label>All-Day</label>
                    <Switch checked={specificTime === "All Day"} onChange={() => setSpecificTime((prevState) => { return (prevState === "All Day" ? "07:00:00 - 07:00:00" : "All Day") })} />
                </div>

                {specificTime !== "All Day" && (
                    <TimePicker.RangePicker
                        defaultValue={[dayjs('07:00:00', 'HH:mm:ss'), dayjs('07:00:00', 'HH:mm:ss')]}

                        onChange={(time, timeString) => { setSpecificTime(timeString[0] + ' - ' + timeString[0]); }} />
                )}
            </div>

            <div className="task-input">
                <div className="reminder-toggle space-between toggle">
                    <label>Reminder</label>
                    <Switch checked={reminder} onChange={() => setReminder(!reminder)} />
                </div>

                <Input
                    placeholder="Tag"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                />
            </div>

            <div className="subtask-section">
                <h4 className='space-between'>Subtasks
                    <Button icon={<Icons.PlusCircleOutlined />} onClick={addSubtask}>
                    </Button></h4>
                {subtasks.map((subtask, index) => (
                    <div key={index} className="subtask-input space-between toggle">
                        <Input
                            placeholder="Subtask"
                            value={subtask}
                            onChange={(e) => {
                                const newSubtasks = [...subtasks];
                                newSubtasks[index] = e.target.value;
                                setSubtasks(newSubtasks);
                            }}
                        />
                        <Button
                            icon={<DeleteOutlined />}
                            onClick={() => removeSubtask(index)}
                        />
                    </div>
                ))}
            </div>

            <div className="form-actions">
                <Button type="primary" onClick={saveTask}>
                    {taskToEdit ? 'Update Task' : 'Add Task'}
                </Button>
            </div>
        </div>
    );
};

export default TaskForm;
