import { Form } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";



const InboxComponent = ({ Msgs, newone }) => {

  return (
    <div className="msgs">
      {Msgs.length >= 1 && (
        <h1 className="formHeading">
          {newone ? "New" : "Old"} messages( {Msgs.length} )
        </h1>
      )}
      {Msgs.map((msg) => {
        const { _id, name, email, message, subject } = msg;
        return (
          <div className="card" key={_id}>
            <h5 className="name">
              <span>Name :</span> {name}
            </h5>
            <h5 className="email">
              <span>Email : </span> {email}
            </h5>

            <h4>
              <span>Subject : </span>
              {subject}
            </h4>
            <span>
              <span>Message : </span>
              {message}
            </span>

            <div className="actions">
              {newone && (
                <Form method="post" action={`/edit-message/${_id}`}>
                  <button type="submit" className="btn updateBtn">
                    <FaRegEye />
                  </button>
                </Form>
              )}
              <Form method="post" action={`/delete-message/${_id}`}>
                <button type="submit" className="btn deleteBtn">
                  <AiFillDelete />
                </button>
              </Form>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default InboxComponent