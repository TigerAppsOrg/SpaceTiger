import React, { useEffect } from "react";

const UploadAndDisplayImage = ({ images, setImages }) => {
  useEffect(() => {
    console.log(images);
  }, [images]);

  return (
    <div>
      {images.map((image) => (
        <div>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(image.file)}
          />
          <br />
          <button
            onClick={() =>
              setImages((images) => images.filter((e) => e !== image))
            }
          >
            Remove
          </button>
        </div>
      ))}
      <input
        type="file"
        name="myImage"
        onChange={(event) => {
          var file = event.target.files[0];
          var reader = new FileReader();
          reader.onload = function (event) {
            // The file's text will be printed here
            setImages((images) => [
              ...images,
              { file: file, data: event.target.result },
            ]);
          };

          reader.readAsDataURL(file);
        }}
      />
    </div>
  );
};

export default UploadAndDisplayImage;
