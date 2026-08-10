"use client";

import {UploadCloudIcon,X} from "lucide-react";
import {useState,useEffect,useRef,DragEvent} from "react";
import Image from "next/image";
import {Locale} from "@/types";

interface ImageUploaderProps{
  initialImageUrl?:string|null;
  onFileSelect:(file:File|null)=>void;
  locale?:Locale;
}

export default function ImageUploader({initialImageUrl,onFileSelect,locale}:ImageUploaderProps){
  const[imageUrl,setImageUrl]=useState<string|null>(initialImageUrl??null);
  const[errorMessage,setErrorMessage]=useState<string|null>(null);
  const[isDragOver,setIsDragOver]=useState(false);
  const inputRef=useRef<HTMLInputElement|null>(null);

  const MAX_BYTES=2*1024*1024;
  const ALLOWED=["image/png","image/jpeg","image/jpg","image/webp"];

  useEffect(()=>{setImageUrl(initialImageUrl??null);},[initialImageUrl]);

  useEffect(()=>{
    return()=>{
      if(imageUrl?.startsWith("blob:"))URL.revokeObjectURL(imageUrl);
    };
  },[imageUrl]);

  function handleFile(file:File){
    setErrorMessage(null);

    if(!ALLOWED.includes(file.type)){
      setErrorMessage(locale==="ar"?"نوع الصورة غير مدعوم":"Unsupported image type");
      return;
    }

    if(file.size>MAX_BYTES){
      setErrorMessage(locale==="ar"?"حجم الصورة أكبر من 2 ميجابايت":"File is too large (max 2MB)");
      return;
    }

    if(imageUrl?.startsWith("blob:"))URL.revokeObjectURL(imageUrl);

    const preview=URL.createObjectURL(file);
    setImageUrl(preview);
    onFileSelect(file);
  }

  function handleInput(e:React.ChangeEvent<HTMLInputElement>){
    const file=e.target.files?.[0];
    if(file)handleFile(file);
    e.currentTarget.value="";
  }

  function handleDrop(e:DragEvent<HTMLDivElement>){
    e.preventDefault();
    setIsDragOver(false);
    const file=e.dataTransfer.files?.[0];
    if(file)handleFile(file);
  }

  function handleDelete(){
    if(imageUrl?.startsWith("blob:"))URL.revokeObjectURL(imageUrl);
    setImageUrl(null);
    setErrorMessage(null);
    onFileSelect(null);
  }

  return(
    <div className="flex flex-col gap-3 w-full">
      <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/jpg,image/webp" className="hidden" onChange={handleInput}/>
      {imageUrl?(
        <div className="relative h-40 w-full">
          <Image src={imageUrl} alt="Preview" fill className="object-cover rounded-md" unoptimized={imageUrl.startsWith("blob:")}/>
          <button type="button" onClick={handleDelete} className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1">
            <X className="w-4 h-4"/>
          </button>
        </div>
      ):(
        <div onDrop={handleDrop} onDragOver={e=>{e.preventDefault();setIsDragOver(true);}} onDragLeave={()=>setIsDragOver(false)} onClick={()=>inputRef.current?.click()} className={`flex flex-col items-center justify-center h-40 w-full border-2 border-dashed rounded-lg cursor-pointer transition-colors ${isDragOver?"bg-gray-50 dark:bg-gray-800":""}`}>
          <UploadCloudIcon className="w-10 h-10 text-gray-400 mb-2"/>
          <p className="text-sm font-semibold text-center">
            {isDragOver?(locale==="ar"?"قم بإفلات الصورة هنا":"Drop image here"):(locale==="ar"?"قم بإفلات الصورة هنا أو انقر للرفع":"Drop image here or click to upload")}
          </p>
          <p className="text-xs text-gray-400">{locale==="ar"?"PNG,JPG,WEBP (2MB)":"PNG,JPG,WEBP (Max 2MB)"}</p>
        </div>
      )}
      {errorMessage&&<p className="text-red-600 text-sm font-medium">{errorMessage}</p>}
    </div>
  );
}