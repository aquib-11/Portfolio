import styled from "styled-components";

const Header = styled.header`
  /* Hide scrollbar for all browsers */
  overflow: hidden; /* Hide both horizontal and vertical scrollbars */

  position: relative;
  background-color: var(--bg-color);
  display: grid;
  grid-template-columns: auto 4fr 3fr 3fr;
  padding: 2rem;
  border-radius: 15px;
  margin: 5rem 0 1rem 0;

  .img-container {
    width: 180px;
    height: 180px;
    border: 5px solid var(--dark-bg-color);
    border-radius: 20px;
    overflow: hidden;
    margin-top: -5rem;
  }

  .img-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .container {
    margin: 0 1rem;
    color: var(--color);
  }

  .bio {
    border-right: 2px solid var(--dark-bg-color);
  }

  .bio h1 {
    font-size: 1.8rem;
    margin-bottom: 0.4rem;
  }

  .bio span {
    color: var(--sec-color);
    font-size: 1rem;
  }

  .name {
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 0.5rem;
  }

  .name span {
    font-size: 1.35rem;
    color: var(--color);
    cursor: pointer;
  }

  .social-icons {
    display: flex;
    align-items: center;
    margin-top: 1.7rem;
  }

  .social-icons a,
  .logOut {
    font-size: 1.5rem;
    margin-right: 1rem;
    background-color: var(--dark-bg-color);
    box-shadow: var(--inner-shadow);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.7rem;
    border-radius: 50px;
    color: var(--sec-color);
    cursor: pointer;
    border: none;
    transition: 0.3s;
  }

  .social-icons a:hover,
  .logOut:hover,
  .toggleTheme:hover {
    color: var(--color);
    border-radius: 10px;
  }

  .info li {
    display: grid;
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  li > span {
    color: var(--sec-color);
    font-size: 0.95rem;
  }

  .actions {
    position: absolute;
    top: 1rem;
    right: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }

  .toggleTheme {
    font-size: 1.7rem;
    padding: 0.6rem;
    color: var(--sec-color);
    background-color: var(--dark-bg-color);
    box-shadow: var(--inner-shadow);
    display: grid;
    align-items: center;
    cursor: pointer;
    border-radius: 50%;
    transition: all 0.3s;
  }

  .mobileIcon {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    grid-template-columns: 1fr;
    padding: 1rem;
    border-radius: 10px;
    margin: 1rem 0;
    height: 280px;
    overflow: auto; /* Allow scrolling on mobile if necessary */

    .img-container {
      width: 130px;
      height: 130px;
      border-radius: 10px;
      margin-top: 0;
    }

    .container {
      margin: 0;
    }

    .info {
      margin-top: 1rem;
    }

    .info li {
      font-size: 1.1rem;
      margin-bottom: 0.5rem;
    }

    .bio {
      border-right: none;
    }

    .bio h1 {
      font-size: 1.5rem;
    }

    .social-icons {
      margin-top: 0.5rem;
    }

    .mobileIcon {
      display: flex;
      align-items: center;
      justify-content: end;
      color: var(--color);
      position: sticky;
      bottom: 0.5rem;
      font-size: 1.5rem;
    }
  }
`;

export default Header;
