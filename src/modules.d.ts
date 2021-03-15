declare module "*.svg" {
  const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const content: string;

  export { ReactComponent };
  export default content;
}

declare module "*.woff2";
declare module "*.mp4";
declare module "*.glb";
declare module "*.gltf";
declare module "*.json";
declare module "*.png";
declare module "*.jpg";
declare module "*.gif";
