export default function Loading() {
  return (
    <div className="loadingPage" aria-label="Loading">
      <div className="skeleton skeletonTitle" />
      <div className="skeletonGrid">
        {Array.from({ length: 8 }).map((_, index) => <div className="skeleton skeletonCard" key={index} />)}
      </div>
    </div>
  );
}
