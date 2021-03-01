import styled, { keyframes } from "styled-components";

const appearFromLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50px)
  }

  to {
    opacity: 1;
    transform: translateX(0)
  }
`;

export const AnimationContainer = styled.div`
  animation: ${appearFromLeft} 1s;
  display: flex;
`;

export const Container = styled.div`
  height: 100vh;
  flex: 1;
  max-width: 992px;
  margin: 0 auto;
  padding: 2.5rem 2rem;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.header`
  
  background: #28262e;

  @media (min-width: 1801px) {
    padding: 20px;
  }

  @media (max-width: 1800px) {
    padding: 20px;
  }

  @media (max-width: 1600px) {
    padding: 20px;
  }

  @media (max-width: 1200px) {
    padding: 15px;
  }    
  
  @media (max-width: 900px) {
    padding: 10px;
  }

  @media (max-width: 600px) {
    padding: 10px;
  }
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  @media (min-width: 1801px) {
    padding: 0 20px;
  }

  @media (max-width: 1800px) {
    padding: 0 20px;
  }

  @media (max-width: 1600px) {
    padding: 0 20px;
  }

  @media (max-width: 1200px) {
    padding: 0 15px;
  }    
  
  @media (max-width: 900px) {
    padding: 0 10px;
  }

  @media (max-width: 600px) {
    padding: 0 5px;
  }

  > img {

    @media (min-width: 1801px) {
      width: 80px;
    }

    @media (max-width: 1800px) {
      width: 80px;
    }

    @media (max-width: 1600px) {
      width: 80px;
    }

    @media (max-width: 1200px) {
      width: 80px;
    }    
    
    @media (max-width: 900px) {
      width: 70px;
    }

    @media (max-width: 600px) {
      width: 60px;
    }
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
    width: 30px;
    height: 30px;
    background: transparent;
    z-index: 999;

    svg {
      color: #999591;
      width: 20px;
      height: 20px;

      &:hover {
        cursor: pointer;
      }
    }
  }
`;

export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    border-radius: 50%;

    @media (min-width: 1801px) {
      width: 56px;
      height: 56px;
    }

    @media (max-width: 1800px) {
      width: 56px;
      height: 56px;
    }

    @media (max-width: 1600px) {
      width: 42px;
      height: 42px;
    }

    @media (max-width: 1200px) {
      width: 48px;
      height: 48px;
    }    
    
    @media (max-width: 900px) {
      width: 44px;
      height: 44px;
    }

    @media (max-width: 600px) {
      width: 40px;
      height: 40px;
    }
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    color: #f4ede8;

    @media (min-width: 1801px) {
      font-size: 18px;
    }

    @media (max-width: 1800px) {
      font-size: 18px;
    }

    @media (max-width: 1600px) {
      font-size: 16px;
    }

    @media (max-width: 1200px) {
      font-size: 15px;
    }    
    
    @media (max-width: 900px) {
      font-size: 14px;
    }

    @media (max-width: 600px) {
      font-size: 12px;
    }
  }

  strong {
    color: #ff9000;

    @media (min-width: 1801px) {
      font-size: 20px;
    }

    @media (max-width: 1800px) {
      font-size: 18px;
    }

    @media (max-width: 1600px) {
      font-size: 17px;
    }

    @media (max-width: 1200px) {
      font-size: 16px;
    }    
    
    @media (max-width: 900px) {
      font-size: 15px;
    }

    @media (max-width: 600px) {
      font-size: 14px;
    }
  }
`;

export const Content = styled.div`
  max-width: 1120px;
  margin: 20px auto;
  display: flex;
  padding: 0 20px;
`;

export const Schedule = styled.div`
  flex: 1;

  h1 {

    @media (min-width: 1801px) {
      font-size: 36px;
    }

    @media (max-width: 1800px) {
      font-size: 36px;
    }

    @media (max-width: 1600px) {
      font-size: 32px;
    }

    @media (max-width: 1200px) {
      font-size: 28px;
    }    
    
    @media (max-width: 900px) {
      font-size: 24px;
    }

    @media (max-width: 600px) {
      font-size: 20px;
    }
  }

  p {
    margin-top: 8px;
    color: #ff9000;
    display: flex;
    align-items: center;
  }

  span {
    display: flex;
    align-items: center;
  }

  span + span::before {
    content: '';
    width: 1px;
    height: 12px;
    background: #ff9000;
    margin: 0 8px;
  }
`;

export const DivAlert = styled.div`
  margin-top: 20px;
  border: 1px solid #ff9000;
  background: rgba(255,255,255,0.1);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NextActivity = styled.div`
  margin-top: 64px;

  /* > a {
    color: #999591;
    font-size: 20px;
    font-weight: 400;

    @media (min-width: 1801px) {
      font-size: 20px;
    }

    @media (max-width: 1800px) {
      font-size: 20px;
    }

    @media (max-width: 1600px) {
      font-size: 18px;
    }

    @media (max-width: 1200px) {
      font-size: 16px;
    }    
    
    @media (max-width: 900px) {
      font-size: 14px;
    }

    @media (max-width: 600px) {
      font-size: 12px;
    }


  } */

  div {
    background: #3e3b47;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: #ff9000;
    }

    > svg {
      
      border-radius: 50%;
      color: #ff9000;

      @media (min-width: 1801px) {
        width: 42px;
        height: 42px;
      }

      @media (max-width: 1800px) {
        width: 42px;
        height: 42px;
      }

      @media (max-width: 1600px) {
        width: 38px;
        height: 38px;
      }

      @media (max-width: 1200px) {
        width: 34px;
        height: 34px;
      }    
      
      @media (max-width: 900px) {
        width: 30px;
        height: 30px;
      }

      @media (max-width: 600px) {
        width: 26px;
        height: 26px;
      }
    }

    > a {
      margin-left: 15px;
      color: #fff;
      text-decoration: none;

      @media (min-width: 1801px) {
        font-size: 18px;
      }

      @media (max-width: 1800px) {
        font-size: 18px;
      }

      @media (max-width: 1600px) {
        font-size: 16px;
      }

      @media (max-width: 1200px) {
        font-size: 16px;
      }    
      
      @media (max-width: 900px) {
        font-size: 16px;
      }

      @media (max-width: 600px) {
        font-size: 14px;
      }
    }

    a + a {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      @media (min-width: 1801px) {
        font-size: 18px;
      }

      @media (max-width: 1800px) {
        font-size: 18px;
      }

      @media (max-width: 1600px) {
        font-size: 16px;
      }

      @media (max-width: 1200px) {
        font-size: 16px;
      }    
      
      @media (max-width: 900px) {
        font-size: 16px;
      }

      @media (max-width: 600px) {
        font-size: 14px;
      }

      svg {
        color: #00c71e;
        margin-right: 8px;
        
        @media (min-width: 1801px) {
          font-size: 18px;
        }

        @media (max-width: 1800px) {
          font-size: 18px;
        }

        @media (max-width: 1600px) {
          font-size: 16px;
        }

        @media (max-width: 1200px) {
          font-size: 16px;
        }    
        
        @media (max-width: 900px) {
          font-size: 16px;
        }

        @media (max-width: 600px) {
          font-size: 14px;
        }
      }
    }
  }
`;