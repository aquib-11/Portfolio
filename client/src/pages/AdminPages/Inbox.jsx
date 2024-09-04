import { Form, Link, useLoaderData } from "react-router-dom";
import styled from "styled-components";
import customFetch from "../../utils/customFetch";
import InboxComponent from "../../components/InboxComponent";

export const InboxLoader = async () => {
  try {
    const { data } = await customFetch.get("/inboxs");
    return { data };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Inbox = () => {
  const { data } = useLoaderData();
  const { inboxs } = data;
  const unreadMsgs = inboxs.filter((inbox) => {
    return !inbox.isread;
  });
  const readMsgs = inboxs.filter((inbox) => {
    return inbox.isread;
  });

  return (
    <Div>
      {readMsgs.length + unreadMsgs.length === 0 && (
        <h1 className="formHeading">NO messages</h1>
      )}

      <InboxComponent Msgs={unreadMsgs} newone={true} />
      <InboxComponent Msgs={readMsgs} newone={false} />

      <div className="read"></div>
    </Div>
  );
};
const Div = styled.div`
  display: grid;
  gap: 2rem;
  h1 {
    text-align: center;
  }
  h5,
  h4 {
    font-size: 1.1rem;
  }
  .msgs {
    display: grid;
    gap: 2rem;
  }
  .card {
    box-shadow: var(--shadow-1);
    border-radius: 15px;
    padding: 2.5rem;
    display: grid;
    gap: 1rem;
    position: relative;
  }

  span {
    color: var(--sec-color);
  }
  .actions {
    position: absolute;
    right: 2rem;
    top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
  }
  .btn {
    background-color: transparent;
    border: none;
    color: var(--color);
    font-size: 1.5rem;
    transition: 0.3s;
    cursor: pointer;
  }
  .updateBtn:hover {
    color: goldenrod;
  }
  .deleteBtn:hover {
    color: red;
  }
  @media only screen and (max-width: 600px) {
    gap: 1rem;
    margin-top: 1rem;
    padding: 0 1rem;
    h1 {
      font-size: 1.2rem;
    }
    h5,
    h4,
    span {
      font-size: 0.8rem;
    }
    .msgs {
      gap: 1rem;
    }
    .card {
      border-radius: 10px;
      padding: 1rem;
      gap: 0.5rem;
    }
    .actions {
      right: 1rem;
      top: 1rem;
      gap: 0.7rem;
    }
    .btn {
      font-size: 1.2rem;
    }
    p {
      word-wrap: break-word;
      overflow-wrap: break-word;
      white-space: normal;
    }
  }
`;
export default Inbox;
