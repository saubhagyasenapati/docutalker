import {
  Pinecone,
  PineconeRecord,
  utils as PineconeUtils,
} from "@pinecone-database/pinecone";
import { downlordFromS3 } from "./s3-server";
import { PDFLoader } from "langchain/document_loaders/fs/pdf";
import {
  Document,
  RecursiveCharacterTextSplitter,
} from "@pinecone-database/doc-splitter";
import { getEmbeddings } from "./embeddings";

import md5 from "md5";
import { convertToAscii } from "./utils";
let pinecone: Pinecone | null = null;

export const getPinecone = async () => {
  if (pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    });
  }
  return pinecone;
};

type PDFPage = {
  pageContent: string;
  metadata: {
    loc: { pageNumber: number };
  };
};
export async function loadS3iIntoPinecone(fileKey: string) {
    console.log(fileKey);
    
  const file_name = await downlordFromS3(fileKey);
  console.log(file_name);
  if (!file_name) {
    throw new Error("Could not downlord");
  }
  const loader = new PDFLoader(file_name);
  const pages = (await loader.load()) as PDFPage[];
  const documents = await Promise.all(pages.map(prepareDocument));
  const vectors = await Promise.all(documents.flat().map(embedDocument));
  const client = await getPinecone();
  const PineconeIndex = client?.index("docutalker");
  const namespace = convertToAscii(fileKey);
 console.log(PineconeIndex,client,vectors,namespace);
 
  const records = [{id:'1',vectors}];

//   await PineconeIndex?.upsert(records);

  return pages;
}
async function embedDocument(doc: Document) {
  try {
    const embedding = await getEmbeddings(doc.pageContent);
    const hash = md5(doc.pageContent);
    return {
      id: hash,
      values: embedding,
      metadata: {
        text: doc.metadata.text,
        pageNumber: doc.metadata.pageNumber,
      },
    } as PineconeRecord;
  } catch (error) {}
}
export const truncateStringByBytes = (str: string, bytes: number) => {
  const enc = new TextEncoder();
  return new TextDecoder("utf-8").decode(enc.encode(str).slice(0, bytes));
};
async function prepareDocument(page: PDFPage) {
  let { pageContent, metadata } = page;
  pageContent = pageContent.replace(/\n/g, "");
  const splitter = new RecursiveCharacterTextSplitter();
  const docs = await splitter.splitDocuments([
    new Document({
      pageContent,
      metadata: {
        pageNumber: metadata.loc.pageNumber,
        text: truncateStringByBytes(pageContent, 360000),
      },
    }),
  ]);
  return docs;
}
