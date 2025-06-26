import vscode from "../const/vscode";
interface PostVsCode {
  type: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

function PostVsCode({ type, data }: PostVsCode) {
  vscode.postMessage({ type, data });
}

export default PostVsCode;
