import { useState } from "react";
import {  useDetailEventFormCreation } from "../../hooks/customHooks";

export const EventDetailCreation = () => {
  const { handleSubmit, handleInputChange } = useDetailEventFormCreation();

  const [state, setState] = useState({ event: {} });

  return (
    <div className="row justify-content-center visible">
      <form
        className="margin-t"
        onSubmit={(ev) => {
          handleSubmit(ev);
        }}
      >
        <div className="form-group text-l">
          <label className="text-whitesmoke margin-r-llg" htmlFor="nameField">
            Event Name:
          </label>

          <input
            className="form-control form-in-signup"
            type="text"
            defaultValue={state?.event?.name}
            id="nameField"
            required={true}
            name="name"
            onChange={(e) => {
              setState({ event: { ...state?.event, name: e.target.value } });
              return handleInputChange(e);
            }}
          />
        </div>
        <div className="form-group text-l">
          <label
            className="text-whitesmoke margin-r-xxxlg"
            htmlFor="placeField"
          >
            Event Place:
          </label>
          <input
            className="form-control form-in-signup"
            type="text"
            defaultValue={state?.event?.place}
            id="placeField"
            name="place"
            required={true}
            onChange={(e) => {
              setState({ event: { ...state?.event, place: e.target.value } });
              handleInputChange(e);
            }}
          />
        </div>

        <div className="form-group text-l">
          <label
            className="text-whitesmoke margin-r-lllg"
            htmlFor="addressField"
          >
            Event address:
          </label>

          <input
            defaultValue={state?.event?.address}
            className="form-control form-in-signup"
            type="text"
            id="addressField"
            name="address"
            required={true}
            autoComplete="address"
            onChange={(e) => {
              setState({ event: { ...state?.event, address: e.target.value } });
              return handleInputChange(e);
            }}
          />
        </div>

        <div className="form-group text-l">
          <label className="text-whitesmoke margin-r " htmlFor="eventCategory">
            Event Category:
          </label>
          <input
            className="form-control form-in-signup"
            type="text"
            defaultValue={state?.event?.category}
            required={true}
            id="eventCategory"
            name="category"
            onChange={(e) => {
              setState({
                event: { ...state?.event, category: e.target.value },
              });
              return handleInputChange(e);
            }}
          />
        </div>

        <div className="form-group text-l">
          <label
            className="text-whitesmoke margin-r "
            htmlFor="faceToFaceField"
          >
            Event is face to face:
          </label>
          <input
            className="form-control form-in-signup"
            type="checkbox"
            defaultChecked={state?.event?.is_face_to_face}
            id="faceToFaceField"
            name="is_face_to_face"
            onChange={(e) => {
              setState({
                event: { ...state?.event, is_face_to_face: e.target.checked },
              });
              return handleInputChange(e);
            }}
          />
        </div>

        <div className="form-group text-l">
          <label className="text-whitesmoke margin-r " htmlFor="startsAtField">
            Event starts at:
          </label>
          <input
            className="form-control form-in-signup"
            type="text"
            defaultValue={state?.event?.starts_at}
            required={true}
            id="startsAtField"
            name="starts_at"
            onChange={(e) => {
              setState({
                event: { ...state?.event, starts_at: !e.target.value },
              });
              return handleInputChange(e);
            }}
          />
        </div>

        <div className="form-group text-l">
          <label className="text-whitesmoke margin-r " htmlFor="endsAtField">
            Event ends at:
          </label>
          <input
            className="form-control form-in-signup"
            type="text"
            defaultValue={state?.event?.ends_at}
            required={true}
            id="endsAtField"
            name="ends_at"
            onChange={(e) => {
              setState({
                event: { ...state?.event, ends_at: !e.target.value },
              });
              return handleInputChange(e);
            }}
          />
        </div>

        <button type="submit" className="form-button button-l margin-b">
          {" "}
          Save modification{" "}
        </button>
      </form>
    </div>
  );
};
