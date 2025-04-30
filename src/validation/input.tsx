"use client";

// Reusable input component
export default function Input({ label, type, register, error }: any) {
  return (
    <div className="flex flex-col gap-1 pt-2">
      <label className="font-semibold text-sm text-gray-900 mt-2 block">{label}</label>
      <input
        type={type}
        {...register}
        className="border rounded-lg px-3 py-2 mt-1  text-sm w-full text-gray-900"
      />
      {error && <span className="text-sm text-red-500 ">{error.message}</span>}
    </div>
  );
}