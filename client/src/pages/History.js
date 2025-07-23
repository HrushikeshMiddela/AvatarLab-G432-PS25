import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
const HistoryDisplay = ({ API_BASE_URL }) => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetchHistory();
    }, []);
    const fetchHistory = async () => {
        setLoading(true);
        setError(null);
        const token = localStorage.getItem('token');
        if (!token) {
            setError("Authentication token not found. Please log in.");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(`${API_BASE_URL}/api/ai-avatar/history`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            console.log("Fetched history:", response.data);
            if (Array.isArray(response.data)) {
                setHistory(response.data);
            }
            else {
                console.error("Unexpected response:", response.data);
                setError("Server response was not a valid history array.");
            }
        }
        catch (err) {
            console.error('Error fetching history:', err);
            setError(err.response?.data?.message || 'Failed to fetch history.');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "p-4 max-w-4xl mx-auto bg-gray-800 text-white rounded-lg shadow-lg my-8", children: [_jsx("h2", { className: "text-3xl font-bold mb-6 text-center text-purple-400", children: "Your Generation History" }), _jsx("button", { onClick: fetchHistory, className: "w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out mb-6", children: "Refresh History" }), loading && _jsx("p", { className: "text-center text-gray-400", children: "Loading history..." }), error && _jsxs("p", { className: "text-center text-red-500", children: ["Error: ", error] }), !loading && !error && history.length === 0 && (_jsx("p", { className: "text-center text-gray-400", children: "No history found. Start generating!" })), _jsx("div", { className: "space-y-6", children: history.map((item) => (_jsxs("div", { className: "bg-gray-700 p-4 rounded-md shadow-md border border-gray-600", children: [_jsxs("p", { className: "text-lg font-semibold text-blue-300 mb-2", children: ["Type: ", item.type.replace('_', ' ').toUpperCase()] }), _jsxs("p", { className: "text-sm text-gray-400 mb-3", children: ["Generated on: ", new Date(item.timestamp).toLocaleString()] }), item.type === 'voice_synthesis' && (_jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Text Input:" }), " ", item.details.textInput] }), _jsxs("p", { children: [_jsx("strong", { children: "Speaker File:" }), " ", item.details.speakerFilename] }), item.details.generatedAudioPath && (_jsxs("div", { children: [_jsx("p", { children: _jsx("strong", { children: "Generated Audio:" }) }), _jsxs("audio", { controls: true, className: "w-full mt-2 rounded-md", children: [_jsx("source", { src: `${API_BASE_URL}/temp_audio_playback?path=${encodeURIComponent(item.details.generatedAudioPath)}`, type: "audio/wav" }), "Your browser does not support the audio element."] })] }))] })), item.type === 'avatar_generation' && (_jsxs("div", { className: "space-y-2", children: [_jsxs("p", { children: [_jsx("strong", { children: "Source Image:" }), " ", item.details.sourceImageFilename] }), _jsxs("p", { children: [_jsx("strong", { children: "Audio Path Used:" }), " ", item.details.generatedAudioPath] }), item.details.refEyeblinkFilename && (_jsxs("p", { children: [_jsx("strong", { children: "Ref Eyeblink:" }), " ", item.details.refEyeblinkFilename] })), item.details.generatedVideoUrl && (_jsxs("div", { children: [_jsx("p", { children: _jsx("strong", { children: "Generated Video:" }) }), _jsxs("video", { controls: true, className: "w-full mt-2 rounded-md border border-gray-500", poster: "https://placehold.co/600x400/333333/FFFFFF?text=Loading+Video", children: [_jsx("source", { src: item.details.generatedVideoUrl, type: "video/mp4" }), "Your browser does not support the video tag."] })] }))] }))] }, item._id))) })] }));
};
export default HistoryDisplay;
