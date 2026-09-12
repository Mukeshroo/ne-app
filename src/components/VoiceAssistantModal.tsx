import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Mic,
  MicOff,
  Volume2,
  X,
  Sparkles,
  Bot,
  User,
  ArrowRight,
  BookOpen,
  Briefcase,
  Calendar,
} from 'lucide-react';

interface VoiceQuery {
  userQueryEn: string;
  userQueryHi: string;
  responseEn: string;
  responseHi: string;
  actionLabelEn: string;
  actionLabelHi: string;
  actionTab: string;
}

export const VoiceAssistantModal: React.FC = () => {
  const {
    isVoiceModalOpen,
    setIsVoiceModalOpen,
    language,
    setActiveTab,
    setIsSkillPassportModalOpen,
    addNotification,
  } = useApp();

  const [isListening, setIsListening] = useState(false);
  const [activeQueryIndex, setActiveQueryIndex] = useState<number | null>(0);
  const [customInput, setCustomInput] = useState('');
  const [conversation, setConversation] = useState<
    { sender: 'user' | 'assistant'; text: string }[]
  >([
    {
      sender: 'assistant',
      text:
        language === 'hi'
          ? 'नमस्ते मुकेश जी! मैं सार्थक डिजिटल सहायक हूँ। आप मुझसे अपने कोर्स, उपस्थिति, प्रमाणपत्र या नौकरियों के बारे में बोलकर पूछ सकते हैं।'
          : 'Namaste Mukesh ji! I am Sarthak AI Voice Assistant. You can ask me about your next recommended course, attendance, skill gap, or cooperative jobs.',
    },
  ]);

  if (!isVoiceModalOpen) return null;

  const sampleQueries: VoiceQuery[] = [
    {
      userQueryEn: 'What is my next recommended course?',
      userQueryHi: 'मेरा अगला कोर्स कौन सा है?',
      responseEn:
        'Based on your current Skill Gap analysis, "Digital Accounting for Cooperatives" is your next recommended course. It will boost your career match to 92% for cooperative accounts roles.',
      responseHi:
        'आपके Skill Gap विश्लेषण के आधार पर "Digital Accounting for Cooperatives" आपका अगला अनुशंसित कोर्स है। इससे सहकारी लेखा नौकरियों के लिए आपका मैच 92% तक बढ़ जाएगा।',
      actionLabelEn: 'Start Course Now',
      actionLabelHi: 'कोर्स शुरू करें',
      actionTab: 'learning',
    },
    {
      userQueryEn: 'What is my current attendance status?',
      userQueryHi: 'मेरी वर्तमान उपस्थिति कितनी है?',
      responseEn:
        'Your current attendance is 89% (24 out of 27 sessions). You have satisfied the mandatory 75% NCCT criteria for final certification and exam eligibility.',
      responseHi:
        'आपकी वर्तमान उपस्थिति 89% (27 में से 24 सत्र) है। आपने अंतिम प्रमाणन और परीक्षा के लिए एनसीईआरटी के अनिवार्य 75% मानदंड को पूरा कर लिया है।',
      actionLabelEn: 'View Attendance Log',
      actionLabelHi: 'उपस्थिति विवरण देखें',
      actionTab: 'attendance',
    },
    {
      userQueryEn: 'Which cooperative jobs match my skills?',
      userQueryHi: 'मेरे कौशल के अनुसार कौन सी नौकरियाँ हैं?',
      responseEn:
        'We found 4 high-match positions: Cooperative Accounts Assistant (92% match at Barabanki DCCB) and PACS Digital Operator (88% match at Haidergarh PACS).',
      responseHi:
        'हमें 4 उच्च-मैच पद मिले हैं: कोऑपरेटिव एकाउंट्स असिस्टेंट (बाराबंकी डीसीसीबी में 92% मैच) और पैक्स डिजिटल ऑपरेटर (हैदरगढ़ पैक्स में 88% मैच)।',
      actionLabelEn: 'Explore Job Openings',
      actionLabelHi: 'नौकरियां देखें',
      actionTab: 'jobs',
    },
    {
      userQueryEn: 'How do I download my verified Skill Passport?',
      userQueryHi: 'मेरा डिजिटल स्किल पासपोर्ट कैसे देखें?',
      responseEn:
        'Your Digital Skill Passport (Skill ID: SAR-2026-00124) is fully verified with 6 approved competencies and linked to DigiLocker. Click below to view and download.',
      responseHi:
        'आपका डिजिटल स्किल पासपोर्ट (स्किल आईडी: SAR-2026-00124) 6 सत्यापित दक्षताओं के साथ पूर्णतः मान्य है और डिजिलॉकर से जुड़ा है। देखने के लिए नीचे क्लिक करें।',
      actionLabelEn: 'Open Skill Passport',
      actionLabelHi: 'स्किल पासपोर्ट खोलें',
      actionTab: 'passport',
    },
  ];

  const handleSelectQuery = (q: VoiceQuery, idx: number) => {
    setActiveQueryIndex(idx);
    const userText = language === 'hi' ? q.userQueryHi : q.userQueryEn;
    const assistantText = language === 'hi' ? q.responseHi : q.responseEn;

    setConversation((prev) => [
      ...prev,
      { sender: 'user', text: userText },
      { sender: 'assistant', text: assistantText },
    ]);

    // Speak aloud using Web Speech API if supported
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(assistantText);
        utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      } catch (e) {
        // graceful fallback
      }
    }
  };

  const handleSimulateVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setIsListening(false);
      // pick first or random query
      const nextQ = sampleQueries[Math.floor(Math.random() * sampleQueries.length)];
      handleSelectQuery(nextQ, 0);
    }, 1800);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    const text = customInput.trim();
    setCustomInput('');

    setConversation((prev) => [
      ...prev,
      { sender: 'user', text },
      {
        sender: 'assistant',
        text:
          language === 'hi'
            ? `आपके प्रश्न "${text}" के लिए: सार्थक एआई ने आपके प्रोफाइल का मिलान किया है। डिजिटल कौशल और पैक्स संचालन में आपकी प्रगति उत्कृष्ट है।`
            : `Regarding your query "${text}": Sarthak AI evaluated your verified profile. Your progress in PACS computerisation and accounting is in the top 15th percentile.`,
      },
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 text-white p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/50 border border-indigo-400/40 flex items-center justify-center">
              <Bot className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-base tracking-tight font-['Outfit']">
                  {language === 'hi' ? 'बोलिए सार्थक से (AI वॉइस असिस्टेंट)' : 'Ask Sarthak — Multilingual Voice Assistant'}
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Rural Ready
                </span>
              </div>
              <p className="text-xs text-blue-200">
                {language === 'hi'
                  ? 'कम डिजिटल साक्षरता वाले ग्रामीण प्रशिक्षुओं के लिए सरल आवाज सहायता'
                  : 'Voice-guided navigation tailored for rural cooperative trainees'}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              if ('speechSynthesis' in window) window.speechSynthesis.cancel();
              setIsVoiceModalOpen(false);
            }}
            className="p-1.5 rounded-lg text-blue-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversation Stream */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/70">
          {conversation.map((msg, i) => (
            <div
              key={i}
              className={`flex items-start space-x-2.5 ${
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {msg.sender === 'assistant' && (
                <div className="w-7 h-7 rounded-lg bg-blue-700 text-white flex items-center justify-center shrink-0 text-xs font-bold">
                  स
                </div>
              )}
              <div
                className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm shadow-xs ${
                  msg.sender === 'user'
                    ? 'bg-blue-800 text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none leading-relaxed'
                }`}
              >
                <p>{msg.text}</p>
              </div>
              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-slate-700 text-white flex items-center justify-center shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {isListening && (
            <div className="flex items-center space-x-2 p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-indigo-900 text-xs">
              <div className="flex space-x-1 items-center">
                <span className="w-2 h-4 bg-indigo-600 rounded-full animate-pulse"></span>
                <span className="w-2 h-6 bg-indigo-600 rounded-full animate-pulse delay-75"></span>
                <span className="w-2 h-3 bg-indigo-600 rounded-full animate-pulse delay-150"></span>
              </div>
              <span className="font-semibold">
                {language === 'hi' ? 'सार्थक आपकी आवाज सुन रहा है...' : 'Listening to your voice... Speak now'}
              </span>
            </div>
          )}
        </div>

        {/* Quick Voice Prompt Chips */}
        <div className="px-4 py-2 bg-slate-100 border-t border-slate-200">
          <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center">
            <Sparkles className="w-3 h-3 mr-1 text-amber-500" />
            {language === 'hi' ? 'सुझाए गए प्रश्न (क्लिक करें या बोलें):' : 'Frequently Asked Voice Queries:'}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleQueries.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectQuery(q, idx)}
                className="text-xs bg-white hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300 text-slate-700 px-3 py-1 rounded-full border border-slate-200 transition-all font-medium cursor-pointer shadow-2xs"
              >
                💬 {language === 'hi' ? q.userQueryHi : q.userQueryEn}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Interaction Controls */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <button
            onClick={handleSimulateVoiceInput}
            disabled={isListening}
            className={`px-4 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition-all cursor-pointer ${
              isListening
                ? 'bg-red-600 text-white animate-pulse'
                : 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-sm border border-amber-500'
            }`}
            id="voice-mic-trigger-btn"
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            <span>
              {isListening
                ? language === 'hi' ? 'सुन रहे हैं...' : 'Listening...'
                : language === 'hi' ? 'माइक दबाएं' : 'Push to Talk'}
            </span>
          </button>

          <form onSubmit={handleCustomSubmit} className="flex-1 flex gap-2">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder={
                language === 'hi'
                  ? 'या यहाँ टाइप करें (उदा. अगला कोर्स क्या है?)...'
                  : 'Or type your question here...'
              }
              className="flex-1 text-xs border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-xl text-xs font-semibold cursor-pointer"
            >
              {language === 'hi' ? 'भेजें' : 'Send'}
            </button>
          </form>
        </div>

        {/* Quick Navigate Link from last response if applicable */}
        {activeQueryIndex !== null && (
          <div className="px-4 py-2 bg-blue-50 border-t border-blue-100 flex items-center justify-between text-xs">
            <span className="text-blue-900 font-medium">
              {language === 'hi' ? 'सुझाया गया कार्य:' : 'Recommended Next Action:'}
            </span>
            <button
              onClick={() => {
                const q = sampleQueries[activeQueryIndex];
                if (q.actionTab === 'passport') {
                  setIsSkillPassportModalOpen(true);
                } else {
                  setActiveTab(q.actionTab);
                }
                setIsVoiceModalOpen(false);
              }}
              className="font-bold text-blue-800 hover:text-blue-950 flex items-center space-x-1 cursor-pointer underline"
            >
              <span>
                {language === 'hi'
                  ? sampleQueries[activeQueryIndex].actionLabelHi
                  : sampleQueries[activeQueryIndex].actionLabelEn}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
