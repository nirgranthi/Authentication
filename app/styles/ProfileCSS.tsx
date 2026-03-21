'use client'

import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

export const Card = styled.div`
  &.card {
    display: flex;
    flex-direction: column;
    gap: 0;
    width: 420px;
    border-radius: 20px;
    box-shadow:
      0 20px 40px rgba(0, 0, 0, 0.1),
      0 5px 15px rgba(0, 0, 0, 0.05),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5),
      inset 0 2px 0 rgba(255, 255, 255, 0.8);
    transform: perspective(1000px) rotateX(1deg) rotateY(-1deg) translateY(-5px);
    transition: all 0.3s ease;
    overflow: hidden;
  }

  &.card:hover {
    transform: perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(-8px);
    box-shadow:
      0 30px 50px rgba(0, 0, 0, 0.12),
      0 10px 20px rgba(0, 0, 0, 0.06),
      inset 0 0 0 1px rgba(255, 255, 255, 0.5),
      inset 0 2px 0 rgba(255, 255, 255, 0.8);
  }
`
