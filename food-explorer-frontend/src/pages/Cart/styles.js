import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    min-width: 32rem;
    height: 100vh;
    overflow: auto;
    overflow: overlay;

    /* Suavização para transições */
    transition: background-color 0.3s ease;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 121.2rem;
    margin: auto;
    padding: 3.5rem 4rem;
    font-family: 'Poppins', sans-serif;
    overflow: auto;
    overflow: overlay;

    > .card-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
    }

    > .card-wrapper h2 {
        font-weight: 500;
        font-size: 3.2rem;
        margin-bottom: 3.2rem;
        justify-content: center;
    }

    .total {
        margin: 20px auto 60px;
        line-height: 64px;
        font-size: 2rem;
        width: 180px;
        height: 64px;
        border-radius: 10px;
        border: 1px solid white;
        transition: transform 0.3s ease;
    }

    @media only screen and (min-width: 768px) {
        max-width: 121.2rem;
        height: 100%;

        > .card-wrapper {
            flex-direction: row;
            justify-content: space-between;
            text-align: left;
            align-items: flex-start;
        }

        .details {
            max-height: 520px;
            overflow: auto;
            overflow: overlay;
        }

        .total {
            margin: 0;
            text-align: center;
            white-space: nowrap;
        }
    }
`;

export const PaymentCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 53.0rem;
  gap: 2rem;

  .paymentHeader {
    .buttons {
      display: flex;
      gap: 1rem;
      height: 8.1rem;
    } 

    .buttons button {
      width: 100%;
      padding: 1.2rem;
      background-color: transparent;
      color: ${({ theme }) => theme.COLORS.GRAY_300};
      border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
      font-size: 1.6rem;
      line-height: 2.4rem;
      cursor: pointer;
      border-radius: 0.8rem;
      transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;

      &:hover {
        background-color: ${({ theme }) => theme.COLORS.GRAY_400};
        color: ${({ theme }) => theme.COLORS.WHITE};
        transform: translateY(-2px);
      }

      &:focus {
        outline: 2px solid ${({ theme }) => theme.COLORS.PRIMARY};
        box-shadow: 0 0 0 3px ${({ theme }) => theme.COLORS.PRIMARY_LIGHT};
      }

      &:disabled {
        cursor: not-allowed;
        background-color: ${({ theme }) => theme.COLORS.GRAY_100};
        color: ${({ theme }) => theme.COLORS.GRAY_400};
      }

      &.active {
        background-color: ${({ theme }) => theme.COLORS.PRIMARY};
        color: ${({ theme }) => theme.COLORS.WHITE};
      }
    }

    .buttons img {
      margin-right: 1rem;
    }
  }

  .paymentBody {
    display: flex;
    flex-direction: column;
    gap: 3rem;
    padding: 2rem;
    border: 1px solid ${({ theme }) => theme.COLORS.GRAY_200};
    border-radius: 0.8rem;

    .inputs, .validTo {
        margin-bottom: 1.5rem;
    }

    .cart, .clock, .approved, .paymentCredit, .paymentPix {
      animation: fade-in 1.2s ease-in-out both;
    }

    .validTo {
      display: flex;
      gap: 1rem;
    }

    .inputs p {
      margin-bottom: 0.5rem;
    }

    #paymentPix img {
      width: 100%;
      text-align: center;
      margin: auto;
      margin-bottom: 2rem;
    }
    
    .qr {
      width: 50%;
      text-align: center;
      margin: auto; 
    }

    .clock p, .approved p {
      font-size: 2rem;
      color: ${({ theme }) => theme.COLORS.GRAY_500};
    }

    @keyframes fade-in {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
`;
