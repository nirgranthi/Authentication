'use client'

import styled from 'styled-components'

export const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f7f7f7;
  color: #151717;
  transition: background-color 0.3s, color 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  &.dark-mode {
    background-color: #121212;
    color: #e0e0e0;

    .card {
      background-color: #1e1e1e;
      box-shadow:
        0 20px 40px rgba(0, 0, 0, 0.5),
        0 5px 15px rgba(0, 0, 0, 0.3),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 2px 0 rgba(255, 255, 255, 0.05);
    }

    .card:hover {
      box-shadow:
        0 30px 50px rgba(0, 0, 0, 0.6),
        0 10px 20px rgba(0, 0, 0, 0.4),
        inset 0 0 0 1px rgba(255, 255, 255, 0.05),
        inset 0 2px 0 rgba(255, 255, 255, 0.05);
    }

    .avatar {
      background: linear-gradient(135deg, #4da3ff, #3b8ce0);
      box-shadow: 0 4px 16px rgba(77, 163, 255, 0.35);
    }

    .info-row {
      border-bottom-color: #2a2a2a;
    }

    .info-label {
      color: #888;
    }

    .info-value {
      color: #e0e0e0;
    }

    .badge-verified {
      background-color: rgba(77, 163, 255, 0.15);
      color: #4da3ff;
    }

    .badge-unverified {
      background-color: rgba(255, 77, 79, 0.15);
      color: #ff6b6d;
    }

    .logout-btn {
      background-color: #2a2a2a;
      color: #ff6b6d;
      border-color: #ff6b6d44;
    }

    .logout-btn:hover {
      background-color: #ff4d4f;
      color: #fff;
      border-color: #ff4d4f;
    }
  }
`

export const Card = styled.div`
  &.card {
    display: flex;
    flex-direction: column;
    gap: 0;
    background-color: #ffffff;
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
