import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-height: 500px;

    background-color: #343434;
    box-shadow: 2px 2px 5px 1px rgba(0, 0, 0, 0.2);
    border-radius: 5px;

    padding: 15px;
    text-align: center;
    font-weight: lighter;
    color: white;

    h4 {
        margin-bottom: 5px;
    }

    svg {
        font-size: 5rem;
        line-height: 0 !important;
    }
`