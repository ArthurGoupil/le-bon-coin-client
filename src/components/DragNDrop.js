import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const DragNDrop = ({ photos, setPhotos }) => {
  // INITIAL REACT DROPZONE STYLING
  const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
  };
  const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
  };
  const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
  };
  const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
  };

  const [isOnDrag, setIsOnDrag] = useState(false);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      const copiedPhotos = [...photos];
      acceptedFiles.forEach(photo => {
        copiedPhotos.push(photo);
      });
      setPhotos(
        copiedPhotos.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    onDragEnter: () => {
      setIsOnDrag(true);
    },
    onDragLeave: () => {
      setIsOnDrag(false);
    },
    onDropAccepted: () => {
      setIsOnDrag(false);
    }
  });

  const thumbs = photos.map((file, index) => (
    <div className="drop-zone-preview" style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img alt={file.name} src={file.preview} style={img} />
      </div>
      <FontAwesomeIcon
        className="icon-close-preview"
        icon={['fas', 'times']}
        onClick={() => {
          const copiedPhotos = [...photos];
          copiedPhotos.splice(index, 1);
          setPhotos(
            copiedPhotos.map(file =>
              Object.assign(file, {
                preview: URL.createObjectURL(file)
              })
            )
          );
        }}
      />
    </div>
  ));

  return (
    <section className="dropzone-container">
      <div
        {...getRootProps({
          className: isOnDrag ? 'dropzone on-drag' : 'dropzone'
        })}
      >
        <input {...getInputProps()} />
        <div>Glissez/déposez des images, ou cliquez pour en ajouter.</div>
      </div>
      <aside style={thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

export default DragNDrop;
