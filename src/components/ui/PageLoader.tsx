import Spinner from "./Spinner";

export default function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <Spinner size="lg" />
    </div>
  );
}
