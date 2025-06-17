function Preloader() {
  return (
    <>
      <div className="preloader-wrapper preloader active">
        <div className="spinner-layer spinner-red-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export { Preloader };
