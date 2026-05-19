import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

type CSVFileImportProps = {
    url: string;
    title: string;
};

export default function CSVFileImport({ url, title }: CSVFileImportProps) {
    const [file, setFile] = React.useState<File>();

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            setFile(file);
        }
    };

    const removeFile = () => {
        setFile(undefined);
    };

    const uploadFile = async () => {
        if (!file) return;

        const res = await fetch(`${url}?name=${encodeURIComponent(file.name)}`);
        const signedUrl = await res.text();

        await fetch(signedUrl, {
            method: "PUT",
            body: file,
            headers: { "Content-Type": "text/csv" },
        });

        setFile(undefined);
    };
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            {!file ? (
                <input type="file" onChange={onFileChange} />
            ) : (
                <div>
                    <button onClick={removeFile}>Remove file</button>
                    <button onClick={uploadFile}>Upload file</button>
                </div>
            )}
        </Box>
    );
}
