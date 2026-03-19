import styled from "styled-components"

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
  color: #151717;
  transition: background-color 0.3s, color 0.3s;

  &.dark-mode {
    background-color: #121212;
    color: #e0e0e0;

    .form {
      background-color: #1e1e1e;
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.5),
        0 5px 15px rgba(0, 0, 0, 0.3),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 2px 0 rgba(255, 255, 255, 0.05);
    }

    .form:hover {
      box-shadow: 
        0 30px 50px rgba(0, 0, 0, 0.6),
        0 10px 20px rgba(0, 0, 0, 0.4),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 2px 0 rgba(255, 255, 255, 0.05);
    }

    ::placeholder {
      color: #888;
    }

    .flexColumn > label {
      color: #e0e0e0;
    }

    .inputForm {
      border-color: #333;
      background-color: #2a2a2a;
    }

    .input {
        color: #e0e0e0;
    }

    .inputForm:focus-within {
      border-color: #4da3ff;
    }

    .rememberMe > span {
      color: #e0e0e0;
    }

    .span {
      color: #4da3ff;
    }

    .p {
      color: #e0e0e0;
    }

    .btn {
      background-color: #2a2a2a;
      color: #e0e0e0;
      border-color: #444;
    }

    .btn:hover {
      border-color: #4da3ff;
    }
  }

  .wrapper {
    padding: 2rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-color: #ffffff;
    padding: 30px;
    width: 450px;
    border-radius: 20px;
    box-shadow: 
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 5px 15px rgba(0, 0, 0, 0.05),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5),
      inset 0 2px 0 rgba(255, 255, 255, 0.8);
    transform: perspective(1000px) rotateX(1deg) rotateY(-1deg) translateY(-5px);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    transition: all 0.3s ease;
  }

  .form:hover {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-8px);
    box-shadow: 
      0 30px 50px rgba(0, 0, 0, 0.12),
      0 10px 20px rgba(0, 0, 0, 0.06),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5),
      inset 0 2px 0 rgba(255, 255, 255, 0.8);
  }

  ::placeholder {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: #999;
  }

  .form button {
    align-self: flex-end;
  }

  .flexColumn {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }

  .flexColumn > label {
    color: #151717;
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid #ecedec;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 5px;
    transition: 0.2s ease-in-out;
    background-color: #fff;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
    background: transparent;
    color: #151717;
    font-size: 15px;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
    border: 1.5px solid #2d79f3;
  }

  .flexRow {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
  }

  .rememberMe {
    display: flex;
    align-items: center;
    gap: 5px;
    cursor: pointer;
  }

  .rememberMe > span {
    font-size: 14px;
    color: #151717;
    font-weight: 400;
  }
  
  .rememberMe > input {
    cursor: pointer;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
    color: #2d79f3;
    font-weight: 500;
    cursor: pointer;
  }
    
  .errorMsg {
    color: #ff4d4f;
    font-size: 13px;
    margin-top: 5px;
    margin-left: 5px;
    font-weight: 500;
  }

  .p {
    text-align: center;
    color: #151717;
    font-size: 14px;
    margin: 5px 0;
  }

  .btn {
    margin-top: 10px;
    width: 100%;
    height: 50px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 500;
    gap: 10px;
    border: 1px solid #ededef;
    background-color: white;
    color: #151717;
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }

  .btn:hover {
    border: 1px solid #2d79f3;
  }
`