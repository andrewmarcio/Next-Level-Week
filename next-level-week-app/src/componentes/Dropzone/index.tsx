import React, {useCallback, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faUpload} from '@fortawesome/free-solid-svg-icons';

import './styles.css';

interface UploadedFile{
    onFileUploaded: (file: File) => void;
}

const Dropzone:React.FC<UploadedFile> = ({ onFileUploaded }) => {
    
    const [selectedFileUrl, setSelectedFileUrl] = useState('');


    const onDrop = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];

        const fileUrl = URL.createObjectURL(file);

        setSelectedFileUrl(fileUrl);
        onFileUploaded(file);
        
    }, [onFileUploaded]);

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*"/>

        {selectedFileUrl
            ? <img src={selectedFileUrl} alt="Point image" />
            : (
                <p>
                    <FontAwesomeIcon icon={faUpload} />
                    Imagem do estabelecimento
                </p>    
            )
        }
    </div>
  )
}

export default Dropzone;