'use client';
import React from 'react';
import {
    Button,
    Modal,
    Table,
    TableDataItem,
    TableSettingsData,
    TextInput,
    Select,
    ThemeProvider,
    withTableSettings,
} from '@gravity-ui/uikit';
import {format} from 'date-fns';
import block from 'bem-cn-lite';
import './UserTable.scss';
import {IData, TStatus} from '@/types/types';
import Link from "next/link";

const b = block('table');
const m = block('modal');
const bt = block('button');
const d = block('date');

export const UserTable = () => {
    const MyTable = withTableSettings({width: 100, sortable: false})(Table);
    const [data, setData] = React.useState<IData[]>(() => {
        const savedData = window.localStorage.getItem('data');
        return savedData
            ? JSON.parse(savedData)
            : [
                  {
                      id: 1,
                      date: '',
                      fullName: '',
                      nameCompany: '',
                      phoneFields: '',
                      commentsFields: '',
                      status: '',
                  },
              ];
    });

    React.useEffect(() => {
        localStorage.setItem('data', JSON.stringify(data));
    }, [data]);

    const columns = [
        {id: 'id'},
        {id: 'date'},
        {id: 'fullName'},
        {id: 'nameCompany'},
        {id: 'phoneFields'},
        {id: 'commentsFields'},
        {id: 'status'},
    ];
    const initialSettings = [
        {id: 'id', isSelected: true},
        {id: 'text', isSelected: true},
        {id: 'date', isSelected: true},
    ];
    // Создаем состояние для отслеживания полей в модальном меню а также отслеживание и админ мода
    const [adminMode, setAdminMode] = React.useState(false);
    const [selectedField, setSelectedField] = React.useState<TableDataItem | null>(null);
    const [settings, setSettings] = React.useState<TableSettingsData>(initialSettings);
    const [modalIsOpen, setModalIsOpen] = React.useState(false);
    const [idFields, setIdFields] = React.useState(0);
    const [dateFields, setDateFields] = React.useState('');
    const [nameCompanyFields, setNameCompanyFields] = React.useState('');
    const [fullnameFields, setFullnameFields] = React.useState('');
    const [phoneFields, setPhoneFields] = React.useState('');
    const [commentsFields, setCommentsFields] = React.useState('');
    const [status, setStatus] = React.useState<TStatus[]>(['new']);

    const addField = () => {
        const newField = {
            id: idFields,
            date: format(dateFields, 'MM:dd:yyyy'),
            fullName: fullnameFields,
            nameCompany: nameCompanyFields,
            phoneFields: phoneFields,
            commentsFields: commentsFields,
            status: status,
        };
        setData([...data, newField]);
        setModalIsOpen(false);
    };
    const deleteField = () => {
        const newData = data.filter(field => field.id !== selectedField?.id);
        setData(newData);
        setModalIsOpen(false);
        setSelectedField(null);
    };

    const handleRowClick = (field: TableDataItem) => {
        if (adminMode) {
            setSelectedField(field);
            setModalIsOpen(true);
        }
    };
    const handleUpdate = () => {
        const updatedData = data.map((item) =>
            item.id === selectedField?.id
                ? {
                      ...item,
                      date: dateFields,
                      fullName: fullnameFields,
                      nameCompany: nameCompanyFields,
                      phoneFields: phoneFields,
                      commentsFields: commentsFields,
                      status: status,
                  }
                : item
        );
        setData(updatedData);
        setModalIsOpen(false);
    };
    return (
        <ThemeProvider>
            <div className={b()}>
                <div className={b('title')}>
                    <h1>Кол-во заявок: {data.length}</h1>
                </div>
                <MyTable
                    data={data}
                    columns={columns}
                    settings={settings}
                    // eslint-disable-next-line arrow-parens
                    updateSettings={(settings) => {
                        setSettings(settings);
                        return Promise.resolve();
                    }}
                    onRowClick={(field) => handleRowClick(field)}
                />
                <div>
                    <div className={bt('group')}>
                        <div>
                            {adminMode ? <></> : <Button onClick={() => setModalIsOpen(true)}>Добавить заявку</Button>}
                        </div>
                        <div>
                            <Button  onClick={() => setAdminMode(!adminMode)}>{adminMode ? 'Выйти из режима администратора': 'Режим администратора'}</Button>
                        </div>
                        <Modal className={m()} open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
                        <div className={m('title')}>
                            <h1>{adminMode ? 'Редактировать заявку' : 'Добавить заявку'}</h1>
                        </div>
                        <div className={m('fields')}>
                            <div>
                                <TextInput
                                    placeholder="Номер заявки"
                                    pin="round-round"
                                    value={String(idFields)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setIdFields(Number(e.target.value))
                                    }
                                />
                                  {idFields && (
                                    <Link href={`https://ati.su/firms/${idFields}/info`} target="_blank" rel="noopener noreferrer">
                                        Перейти на сайт ATI
                                    </Link>
                                )}
                            </div>
                            <div>
                                <input
                                    type="date"
                                    className={d()}
                                    value={dateFields}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setDateFields(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <TextInput
                                    placeholder="Название фирмы клиента"
                                    pin="round-round"
                                    value={nameCompanyFields}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setNameCompanyFields(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <TextInput
                                    placeholder="ФИО перевозчика"
                                    pin="round-round"
                                    value={fullnameFields}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setFullnameFields(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <TextInput
                                    placeholder="Контактный телефон перевозчика"
                                    pin="round-round"
                                    value={phoneFields}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setPhoneFields(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <TextInput
                                    placeholder="Комментарии"
                                    pin="round-round"
                                    value={commentsFields}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        setCommentsFields(e.target.value)
                                    }
                                />
                            </div>
                            <div>
                            {adminMode ? (
                                <Select
                                    value={status}
                                    onUpdate={(value: string[]) => setStatus(value as TStatus[])}
                                >
                                    <Select.Option value="new">Новый</Select.Option>
                                    <Select.Option value="in work">В работе</Select.Option>
                                    <Select.Option value="done">Завершено</Select.Option>
                                </Select>
                            ) : null}
                            </div>
                            <Button onClick={adminMode ? handleUpdate : addField}>
                                {adminMode ? 'Обновить заявку' : 'Создать заявку'}
                            </Button>
                            {adminMode && ( <Button onClick={deleteField}>
                                Удалить заявку
                            </Button>)}
                        </div>
                    </Modal>
                </div>
            </div>
        </div>
        </ThemeProvider>
    );
};
