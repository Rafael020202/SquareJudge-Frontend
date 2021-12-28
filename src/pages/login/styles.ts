import styled from 'styled-components';

export const Container = styled.div`
    background-color: #ECECEC;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .svg {
        position: absolute;
        bottom: 1px;
        z-index: 1;
    }
`;

export const Content = styled.form`
    width: 100%;
    max-width: 350px;

    text-align: center;
    color: #413D3D;
    z-index: 10;
`;

export const SignIn = styled.div`
    line-height: 2.5rem;
`

export const ForgotPassword = styled.div`
    color: #413D3D;
    font-size: 0.8rem;
    font-weight: 200;
    margin: 10px 0 10px 0;
`;