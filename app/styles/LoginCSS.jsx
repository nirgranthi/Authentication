import styled from "styled-components"

export const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;

  .wrapper {
    padding: 2rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
    font-weight: 600;
  }

  .inputForm {
    border: 1.5px solid transparent;
    border-radius: 10px;
    height: 50px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    padding-right: 5px;
    transition: 0.2s ease-in-out;
  }

  .input {
    margin-left: 10px;
    border-radius: 10px;
    border: none;
    width: 100%;
    height: 100%;
    background: transparent;
    font-size: 15px;
  }

  .input:focus {
    outline: none;
  }

  .inputForm:focus-within {
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
    font-weight: 400;
  }
  
  .rememberMe > input {
    cursor: pointer;
  }

  .span {
    font-size: 14px;
    margin-left: 5px;
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
    cursor: pointer;
    transition: background-color 0.2s, color 0.2s, border-color 0.2s;
  }

  .btn:hover {
  }
`