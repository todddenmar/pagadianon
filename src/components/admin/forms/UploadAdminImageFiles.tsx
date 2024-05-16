'use client';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import { storage } from '@/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { dbAddAdminImage, dbUpdateAdminImage } from '@/helpers/firebaseHelpers';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';

function UploadAdminImageFiles() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = async (acceptedFiles: File[]) => {
    acceptedFiles.forEach(async (file) => {
      const reader = new FileReader();
      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (isLoading) return;
    if (!user) return;

    setIsLoading(true);
    const newData = {
      userId: user.id,
      filename: selectedFile.name,
      type: selectedFile.type,
      size: selectedFile.size,
      createdAt: moment(new Date()).format('LLL'),
      isArchived: false,
    };
    const res = await dbAddAdminImage({ data: newData });
    if (res.status === 'error') {
      console.log(res.error);
      return;
    }
    const imageID = res.data;
    const imageRef = ref(storage, `root/settings/files/${imageID}`);
    await uploadBytes(imageRef, selectedFile).then(async (snapshot) => {
      const downloadURL = await getDownloadURL(imageRef);
      const res = await dbUpdateAdminImage({
        imageID: imageID!,
        downloadURL,
      });
      if (res.status === 'error') {
        console.log(res.error);
      }
    });
    setIsLoading(false);
  };
  //max size is 20MB
  const maxSize = 20971520;
  return (
    <Dropzone
      minSize={0}
      maxSize={maxSize}
      onDrop={(acceptedFiles) => onDrop(acceptedFiles)}
    >
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section>
            <div
              {...getRootProps()}
              className={cn(
                'w-full flex justify-center items-center cursor-pointer p-5 border border-dashed rounded-lg text-center',
                isDragActive
                  ? 'bg-blue-500 text-white animate-pulse'
                  : 'bg-slate-100/20'
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && 'Click here or drop a file to upload!'}
              {isDragActive && !isDragReject && 'Drop to upload this file!'}
              {isDragReject && 'File type not accepted, sorry!'}
              {isFileTooLarge && (
                <div className="text-destructive mt-2">File is too large</div>
              )}
            </div>
          </section>
        );
      }}
    </Dropzone>
  );
}

export default UploadAdminImageFiles;
