const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://randomplayables.com/api';
const GAME_ID = 'decatchers';

export async function initGameSession(userId?: string, username?: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/game-session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        gameId: GAME_ID,
        ...(userId && { passedUserId: userId }),
        ...(username && { passedUsername: username })
      }),
    });
    if (!response.ok) throw new Error('Failed to initialize game session.');
    return await response.json();
  } catch (error) {
    console.error('Error initializing game session:', error);
    return { sessionId: `local-${Date.now()}` }; // Fallback to a local session ID
  }
}

export async function saveGameData(session: any, gameData: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/game-data`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sessionId: session.sessionId,
        roundNumber: 1, // decatchers is a single-round game
        roundData: gameData,
        ...(session.userId && { passedUserId: session.userId }),
        ...(session.username && { passedUsername: session.username })
      }),
    });
    if (!response.ok) throw new Error('Failed to save game data.');
    return await response.json();
  } catch (error) {
    console.error('Error saving game data:', error);
  }
}