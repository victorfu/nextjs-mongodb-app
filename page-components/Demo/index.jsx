import { Spacer } from '@/components/Layout';
import styles from './Demo.module.css';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { whiteTheme } from '@/page-components/Demo/white-theme';
import 'tui-image-editor/dist/tui-image-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';

let editorIns = null;

export const Demo = () => {
  const { query } = useRouter();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.url) {
      setSelectedImage(query.url);
    }
  }, [query]);

  useEffect(() => {
    if (editorIns === null) {
      const ImageEditor = require('tui-image-editor');
      editorIns = new ImageEditor(document.querySelector('#tui-image-editor'), {
        includeUI: {
          loadImage: {
            path: selectedImage || '/ponyta.jpg',
            name: 'image',
          },
          theme: whiteTheme,
          initMenu: 'draw',
          uiSize: {
            width: '1100px',
            height: '900px',
          },
          menuBarPosition: 'top',
        },
        cssMaxWidth: 700,
        cssMaxHeight: 500,
        selectionStyle: {
          cornerSize: 20,
          rotatingPointOffset: 70,
        },
      });
    }

    editorIns.loadImageFromURL(selectedImage, 'image').then(() => {
      console.log('.');
    });
  }, [selectedImage]);

  const onClick = () => {
    const images = [
      // {
      //   url: 'https://res.cloudinary.com/victor2405/image/upload/v1468066156/sample.jpg',
      // },
      // {
      //   url: 'https://res.cloudinary.com/victor2405/image/upload/v1627003608/bxahy8o0ug7ky6txulg0.jpg',
      // },
      // {
      //   url: 'https://res.cloudinary.com/victor2405/image/upload/v1627005115/mle3ivwc71subtwztrrm.png',
      // },
      {
        url: 'https://res.cloudinary.com/victor2405/image/upload/v1635405261/1_ykmk68.jpg',
      },
      {
        url: 'https://res.cloudinary.com/victor2405/image/upload/v1635405261/0_kjubhr.jpg',
      },
    ];
    setImages(images);
    console.log(images);
  };

  const onSelected = (url) => {
    setSelectedImage(url);
    setLoading(true);
    fetch('https://a.s.ap.ngrok.io/detect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSelectedImage(data.base64);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.root}>
      <Spacer size={1} axis="vertical" />
      <button onClick={onClick}>Fetch</button>
      <Spacer size={1} axis="vertical" />
      <div className={styles.mediaContainer}>
        <div className={styles.imageContainer}>
          {images &&
            images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                className={styles.image}
                onClick={() => {
                  onSelected(image.url);
                }}
              />
            ))}
        </div>
      </div>
      <Spacer size={1} axis="vertical" />
      {loading && <div>Working...</div>}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div id="tui-image-editor" />
      </div>
    </div>
  );
};
