
const CategoryForm = ({handleSubmit,value,setValue}) => {
  return (
    <>
      <form
        className="border-right pr-5 mb-2 mt-2 container d-flex justify-content-center align-items-center flex-column"
        method="post"
        id="contactForm"
        name="contactForm"
        onSubmit={handleSubmit}
      >
        <div
          className="row container d-flex justify-content-center align-items-center flex-column"
          style={{ width: "700px" }}
        >
          <div className="col-md-6 form-group">
            <input
              type="text"
              className="form-control w-100"
              name="fname"
              id="fname"
              placeholder="Enter new category"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
          </div>
          <input
            type="submit"
            defaultValue="Send Message"
            className="btn btn-primary w-50"
          />
        </div>
      </form>
    </>
  );
};

export default CategoryForm;
