import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import PomodoroTimer from './PomodoroTimer';

// Use fake timers to control setInterval and clearInterval
jest.useFakeTimers();

describe('PomodoroTimer Component', () => {
  const initialTimeFormatted = '25:00';

  beforeEach(() => {
    // Reset mocks and timers before each test
    jest.clearAllMocks();
    jest.clearAllTimers();
    // Spy on window.alert and provide a mock implementation
    jest.spyOn(window, 'alert').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore the original alert implementation
    window.alert.mockRestore();
  });

  test('displays the initial time correctly (25:00)', () => {
    render(<PomodoroTimer />);
    expect(screen.getByText(initialTimeFormatted)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /start/i })).toBeEnabled();
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument(); // Pause is initially hidden
    expect(screen.getByRole('button', { name: /reset/i })).toBeEnabled();
  });

  test('clicking "Start" changes button states and starts the timer', () => {
    render(<PomodoroTimer />);
    const startButton = screen.getByRole('button', { name: /start/i });
    
    fireEvent.click(startButton);

    expect(startButton).toBeDisabled();
    expect(screen.getByRole('button', { name: /pause/i })).toBeEnabled(); // Pause appears and is enabled
    expect(screen.getByRole('button', { name: /reset/i })).toBeEnabled(); // Reset remains enabled

    // Check if time decrements after 1 second
    act(() => {
      jest.advanceTimersByTime(1000); // Advance timer by 1 second
    });
    expect(screen.getByText('24:59')).toBeInTheDocument();
  });

  test('clicking "Pause" changes button states and pauses the timer', () => {
    render(<PomodoroTimer />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton); // Start the timer

    act(() => {
      jest.advanceTimersByTime(2000); // Let it run for 2 seconds
    });
    expect(screen.getByText('24:58')).toBeInTheDocument();

    const pauseButton = screen.getByRole('button', { name: /pause/i });
    fireEvent.click(pauseButton);

    expect(startButton).toBeEnabled(); // Start button should be re-enabled
    expect(startButton).not.toBeDisabled(); 
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument(); // Pause button should disappear

    // Check that time does not decrement further after pausing
    act(() => {
      jest.advanceTimersByTime(5000); // Advance timer by 5 more seconds
    });
    expect(screen.getByText('24:58')).toBeInTheDocument(); // Time should remain paused
  });

  test('clicking "Reset" resets the time and button states', () => {
    render(<PomodoroTimer />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton); // Start the timer

    act(() => {
      jest.advanceTimersByTime(5000); // Let it run for 5 seconds
    });
    expect(screen.getByText('24:55')).toBeInTheDocument();

    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    expect(screen.getByText(initialTimeFormatted)).toBeInTheDocument(); // Time is reset
    expect(startButton).toBeEnabled();
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument(); // Pause is hidden
    expect(resetButton).toBeEnabled();

    // Ensure timer is not running after reset
    act(() => {
      jest.advanceTimersByTime(2000);
    });
    expect(screen.getByText(initialTimeFormatted)).toBeInTheDocument();
  });
  
  test('timer stops at 00:00 and shows alert', () => {
    render(<PomodoroTimer />);
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    act(() => {
      jest.advanceTimersByTime(25 * 60 * 1000); // Advance timer by 25 minutes
    });

    expect(screen.getByText('00:00')).toBeInTheDocument();
    expect(window.alert).toHaveBeenCalledWith('Pomodoro session finished!');
    expect(startButton).toBeDisabled(); // Start should be disabled when time is 0
    expect(screen.queryByRole('button', { name: /pause/i })).not.toBeInTheDocument();
  });
});
