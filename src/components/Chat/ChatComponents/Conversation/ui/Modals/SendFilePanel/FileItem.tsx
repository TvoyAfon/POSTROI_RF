import { filesize } from 'filesize'
import { ChangeEvent, FC, useMemo, useRef } from 'react'
import arrowReload from '../../../../../../../assets/images/chat_images/arrow-reload.svg'
import deleteIcon from '../../../../../../../assets/images/chat_images/delete.svg'
import { FILES_FORMATS_ACCEPT } from '../../../../../../../config/config'
import IconButton from '../../../../../../ui/IconButton/IconButton'
import { getFileTypeIcon } from '../../../../../utils/utils'

interface IFileItem {
    file: File
    onDelete: (filename: string) => void
    onChange: (targetFilename: string, newFile: File) => void
}

const FileItem: FC<IFileItem> = ({ file, onChange, onDelete }) => {
    const filesInputRef = useRef<HTMLInputElement>(null);
    const fileSize = useMemo(() => filesize(file.size, {
        standard: 'jedec'
    }), [file])
    const fileTypeIcon = useMemo(() => {
        return getFileTypeIcon(file.type, URL.createObjectURL(file));
    }, [file])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return;

        onChange && onChange(file.name, files[0]);
    }

    return (
        <div style={{
            display: 'flex',
            gap: '24px'
        }}>
            <img src={fileTypeIcon} alt="" style={{
                width: '32px',
                height: '40px'
            }} />
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
            }}>
                <span style={{
                    fontWeight: 300,
                    fontSize: '12px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: '185px'
                }} title={file.name}>
                    {file.name}
                </span>
                <span style={{
                    fontSize: '16px',
                    fontWeight: 300,
                    color: '#8E8E93'
                }}>{fileSize}</span>
            </div>
            <div style={{
                display: 'flex',
                gap: '8px',
                marginLeft: 'auto'
            }}>
                <input accept={FILES_FORMATS_ACCEPT} type="file" ref={filesInputRef} onChange={handleChange} style={{ display: 'none' }} />
                <IconButton type='button' icon={arrowReload} onClick={() => filesInputRef.current?.click()} />
                <IconButton type='button' icon={deleteIcon} onClick={() => onDelete(file.name)} />
            </div>
        </div>
    )
}

export default FileItem