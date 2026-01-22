export function SkeletonCard({ isPlatform = false }) {
    return (
        <div data-testid="skeleton-card" className="cardd skeleton">
            <div className="image-wrapper">
                <div className="skeleton-img"></div>
            </div>
            <div className="platform-content">
                {isPlatform ? (
                    <>
                        <div className="skeleton-text short"></div>
                        <div className="skeleton-text long"></div>
                    </>
                ) : (
                    <div className="skeleton-text medium"></div>
                )}
            </div>
        </div>
    );
}