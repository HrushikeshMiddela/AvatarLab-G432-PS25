import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useEffect, useState, useRef } from "react";
import { Mic, User, Play, Download, Pause } from 'lucide-react';
import { Navbar } from '../components/Navbar';
const Loader = ({ message = "Loading..." }) => (_jsxs("div", { className: "flex flex-col items-center justify-center gap-4 p-8", children: [_jsx("div", { className: "relative", children: _jsx("div", { className: "w-12 h-12 border-4 border-white/20 border-t-blue-500 rounded-full animate-spin" }) }), _jsx("p", { className: "text-gray-300 font-medium", children: message })] }));
const HeygenPage = () => {
    const [step, setStep] = useState(1);
    const [voices, setVoices] = useState([]);
    const [avatars, setAvatars] = useState([]);
    const [selectedVoice, setSelectedVoice] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [prompt, setPrompt] = useState("");
    const [loading, setLoading] = useState(false);
    const [voicesLoading, setVoicesLoading] = useState(true);
    const [avatarsLoading, setAvatarsLoading] = useState(true);
    const [videoUrl, setVideoUrl] = useState(null);
    const [generationStatus, setGenerationStatus] = useState(null);
    const [playingVoice, setPlayingVoice] = useState(null);
    const intervalRef = useRef(null);
    const audioRefs = useRef(new Map());
    useEffect(() => {
        setVoicesLoading(true);
        fetch("http://localhost:5000/api/heygen/voices")
            .then((res) => res.json())
            .then((data) => {
            const allVoices = data.voices || [];
            const maleVoices = allVoices.filter((v) => v.gender?.toLowerCase() === 'male').slice(0, 5);
            const femaleVoices = allVoices.filter((v) => v.gender?.toLowerCase() === 'female').slice(0, 5);
            setVoices([...maleVoices, ...femaleVoices]);
        })
            .finally(() => setVoicesLoading(false));
        setAvatarsLoading(true);
        fetch("http://localhost:5000/api/heygen/avatars")
            .then((res) => res.json())
            .then((data) => {
            const allAvatars = data || [];
            const pickUniqueFrontAvatars = (gender) => {
                const genderAvatars = allAvatars.filter((a) => a.gender?.toLowerCase() === gender);
                const map = new Map();
                for (const avatar of genderAvatars) {
                    const name = avatar.avatar_name.toLowerCase();
                    const isFront = name.includes("front");
                    const baseName = name.split(" ")[0];
                    if (isFront && !map.has(baseName)) {
                        map.set(baseName, avatar);
                    }
                }
                return Array.from(map.values()).slice(0, 5);
            };
            const male = pickUniqueFrontAvatars("male");
            const female = pickUniqueFrontAvatars("female");
            setAvatars([...male, ...female]);
        })
            .finally(() => setAvatarsLoading(false));
        return () => {
            if (intervalRef.current)
                clearInterval(intervalRef.current);
        };
    }, []);
    const toggleVoicePlay = (voiceId, audioUrl) => {
        const currentAudio = audioRefs.current.get(voiceId);
        if (playingVoice === voiceId && currentAudio) {
            currentAudio.pause();
            setPlayingVoice(null);
        }
        else {
            if (playingVoice && audioRefs.current.get(playingVoice)) {
                audioRefs.current.get(playingVoice).pause();
            }
            let audio = audioRefs.current.get(voiceId);
            if (!audio) {
                audio = new Audio(audioUrl);
                audio.onended = () => setPlayingVoice(null);
                audioRefs.current.set(voiceId, audio);
            }
            audio.play();
            setPlayingVoice(voiceId);
        }
    };
    const pollVideoStatus = async (videoId) => {
        setGenerationStatus("Processing video... This may take a few moments.");
        intervalRef.current = setInterval(async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/heygen/video-status/${videoId}`);
                const data = await res.json();
                if (data.status === 'completed') {
                    setVideoUrl(data.video_url);
                    setGenerationStatus("Video generated successfully!");
                    setLoading(false);
                    setStep(3);
                    clearInterval(intervalRef.current);
                }
                else if (data.status === 'failed') {
                    setGenerationStatus("Video generation failed. Please try again.");
                    setLoading(false);
                    clearInterval(intervalRef.current);
                }
                else {
                    setGenerationStatus(`Status: ${data.status}`);
                }
            }
            catch (err) {
                setGenerationStatus("Error checking video status.");
                setLoading(false);
                clearInterval(intervalRef.current);
            }
        }, 15000);
    };
    const handleGenerate = async () => {
        if (!selectedVoice || !selectedAvatar || !prompt) {
            alert("Missing required fields.");
            return;
        }
        setLoading(true);
        setVideoUrl(null);
        setGenerationStatus("Generating video...");
        try {
            const res = await fetch("http://localhost:5000/api/heygen/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    voice_id: selectedVoice.voice_id,
                    avatar_id: selectedAvatar.avatar_id,
                    script: prompt,
                }),
            });
            const data = await res.json();
            const videoId = data.video_id;
            if (videoId) {
                pollVideoStatus(videoId);
            }
            else {
                throw new Error("No video ID returned.");
            }
        }
        catch (err) {
            console.error(err);
            setGenerationStatus("Error generating video.");
            setLoading(false);
        }
    };
    const resetForm = () => {
        setSelectedVoice(null);
        setSelectedAvatar(null);
        setPrompt("");
        setVideoUrl(null);
        setGenerationStatus(null);
        setStep(1);
        audioRefs.current.forEach((audio) => audio.pause());
        setPlayingVoice(null);
    };
    return (_jsxs("div", { className: "min-h-screen bg-black text-white pt-[64px]", children: [_jsx(Navbar, { scrolled: true }), _jsxs("div", { className: "container mx-auto px-6 pt-8 pb-16 max-w-6xl space-y-8", children: [_jsx("div", { className: "flex justify-between items-center mb-12 max-w-3xl mx-auto", children: [1, 2, 3].map((s, idx) => (_jsxs(React.Fragment, { children: [_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: `w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold
                  ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`, children: s }), _jsx("span", { className: "mt-2 text-sm", children: s === 1 ? 'Select' : s === 2 ? 'Script' : 'Result' })] }), idx < 2 && (_jsx("div", { className: `flex-1 h-1 mx-2 ${step > s ? 'bg-blue-600' : 'bg-gray-700'}` }))] }, s))) }), step === 1 && (_jsxs(_Fragment, { children: [_jsxs("div", { className: "bg-gray-900/50 p-8 rounded-2xl border border-white/10", children: [_jsxs("h2", { className: "text-2xl font-bold mb-6 flex items-center gap-3", children: [_jsx(Mic, { className: "text-blue-400" }), "Choose a Voice"] }), voicesLoading ? _jsx(Loader, { message: "Loading voices..." }) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4", children: voices.map((voice) => (_jsxs("div", { onClick: () => setSelectedVoice(voice), className: `bg-black/40 border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${selectedVoice?.voice_id === voice.voice_id
                                                ? "border-blue-500 shadow-lg shadow-blue-500/25"
                                                : "border-white/10 hover:border-blue-400"}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "font-semibold truncate", children: voice.name }), _jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400", children: voice.gender })] }), _jsx("button", { onClick: (e) => {
                                                        e.stopPropagation();
                                                        toggleVoicePlay(voice.voice_id, voice.preview_audio);
                                                    }, className: "w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-2 flex items-center justify-center gap-2", children: playingVoice === voice.voice_id ? _jsxs(_Fragment, { children: [_jsx(Pause, { className: "w-4 h-4" }), " Pause"] }) : _jsxs(_Fragment, { children: [_jsx(Play, { className: "w-4 h-4" }), " Play"] }) })] }, voice.voice_id))) }))] }), _jsxs("div", { className: "bg-gray-900/50 p-8 rounded-2xl border border-white/10", children: [_jsxs("h2", { className: "text-2xl font-bold mb-6 flex items-center gap-3", children: [_jsx(User, { className: "text-blue-400" }), "Choose an Avatar"] }), avatarsLoading ? _jsx(Loader, { message: "Loading avatars..." }) : (_jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4", children: avatars.map((avatar) => (_jsxs("div", { onClick: () => setSelectedAvatar(avatar), className: `bg-black/40 border rounded-xl p-4 cursor-pointer transition-all duration-300 hover:scale-105 ${selectedAvatar?.avatar_id === avatar.avatar_id
                                                ? "border-blue-500 shadow-lg shadow-blue-500/25"
                                                : "border-white/10 hover:border-blue-400"}`, children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "font-semibold truncate", children: avatar.avatar_name }), _jsx("span", { className: "text-xs px-2 py-1 rounded-full bg-blue-500/20 text-blue-400", children: avatar.gender })] }), _jsx("div", { className: "aspect-square bg-black/60 rounded-lg overflow-hidden", children: avatar.preview_image_url ? (_jsx("img", { src: avatar.preview_image_url, alt: avatar.avatar_name, className: "w-full h-full object-cover" })) : (_jsx("div", { className: "w-full h-full flex items-center justify-center", children: _jsx(User, { className: "w-12 h-12 text-gray-600" }) })) })] }, avatar.avatar_id))) }))] }), _jsx("button", { onClick: () => {
                                    if (!selectedVoice || !selectedAvatar) {
                                        alert("Please select both a voice and an avatar.");
                                        return;
                                    }
                                    setStep(2);
                                }, className: "w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl", children: "Continue to Script" })] })), step === 2 && (_jsxs(_Fragment, { children: [(step === 2 || step === 3) && selectedVoice && selectedAvatar && (_jsxs("div", { className: "flex items-center gap-6 mb-8 bg-gray-900/50 border border-white/10 p-4 rounded-xl", children: [_jsx("div", { className: "w-24 h-24 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center", children: selectedAvatar.preview_image_url ? (_jsx("img", { src: selectedAvatar.preview_image_url, alt: selectedAvatar.avatar_name, className: "w-full h-full object-cover" })) : (_jsx(User, { className: "text-gray-400 w-12 h-12" })) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: selectedAvatar.avatar_name }), _jsxs("p", { className: "text-gray-400 text-sm mb-2", children: ["Voice: ", selectedVoice.name] }), _jsxs("p", { className: "text-gray-500 text-xs", children: ["Gender: ", selectedAvatar.gender || 'Unknown'] })] })] })), _jsxs("div", { className: "bg-gray-900/50 p-8 rounded-2xl border border-white/10", children: [_jsx("h2", { className: "text-2xl font-bold mb-6", children: "Your Script" }), _jsx("textarea", { value: prompt, onChange: (e) => setPrompt(e.target.value), placeholder: "What should your avatar say?", rows: 4, className: "w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white resize-none min-h-[120px]" })] }), _jsxs("div", { className: "flex flex-col sm:flex-row gap-4", children: [_jsx("button", { onClick: () => setStep(1), className: "w-full sm:w-1/2 bg-gray-700 hover:bg-gray-600 text-white py-4 rounded-xl", children: "Back to Selection" }), _jsx("button", { onClick: handleGenerate, disabled: loading || !prompt, className: "w-full sm:w-1/2 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl", children: loading ? "Generating..." : "Generate Video" })] }), loading && _jsx(Loader, { message: generationStatus || "Generating video..." }), !loading && generationStatus && (_jsx("div", { className: "text-gray-400 text-center", children: generationStatus }))] })), step === 3 && videoUrl && (_jsxs("div", { className: "bg-gray-900/50 p-8 rounded-2xl border border-white/10", children: [(step === 3) && selectedVoice && selectedAvatar && (_jsxs("div", { className: "flex items-center gap-6 mb-8 bg-gray-900/50 border border-white/10 p-4 rounded-xl", children: [_jsx("div", { className: "w-24 h-24 rounded-lg overflow-hidden bg-gray-800 flex items-center justify-center", children: selectedAvatar.preview_image_url ? (_jsx("img", { src: selectedAvatar.preview_image_url, alt: selectedAvatar.avatar_name, className: "w-full h-full object-cover" })) : (_jsx(User, { className: "text-gray-400 w-12 h-12" })) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold", children: selectedAvatar.avatar_name }), _jsxs("p", { className: "text-gray-400 text-sm mb-2", children: ["Voice: ", selectedVoice.name] }), _jsxs("p", { className: "text-gray-500 text-xs", children: ["Gender: ", selectedAvatar.gender || 'Unknown'] })] })] })), _jsxs("h2", { className: "text-2xl font-bold mb-6 flex items-center gap-3", children: [_jsx(Play, { className: "text-blue-400" }), "Your AI Avatar Video"] }), _jsx("video", { src: videoUrl, controls: true, className: "w-full rounded-xl mb-6" }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [_jsxs("a", { href: videoUrl, download: "ai-avatar.mp4", className: "bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-center", children: [_jsx(Download, { size: 20, className: "inline-block mr-2" }), "Download Video"] }), _jsx("button", { onClick: resetForm, className: "bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl", children: "Create Another" })] })] }))] })] }));
};
export default HeygenPage;
