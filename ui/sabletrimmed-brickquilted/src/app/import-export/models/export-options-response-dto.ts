export interface ExportOptionsResponseDto {
  documentTypes: IDocumentType[];
  exportOptions: IExportOption[];
}

export interface IDocumentType {
  name: string;
  description: string;
}

export interface IExportOption {
  name: string;
  description: string;
  supportedDocumentTypes: string[];
}
