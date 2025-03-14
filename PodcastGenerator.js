import { useState } from "react";
import axios from "axios";
import { Button, Input, Textarea, Card, CardContent } from "@/components/ui";

export default function PodcastGenerator() {
  const [topic, setTopic] = useState("");
  const [script, setScript] = useState("");
  const [loading, setLoading] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const generateScript = async () => {
    setLoading(true);
    setScript("");
    setAudioUrl(null);
    try {
      const response = await axios.post("/api/generate-script", { topic });
      setScript(response.data.script);
    } catch (error) {
      alert("Error generating script");
    }
    setLoading(false);
  };

  const generateAudio = async () => {
    setLoading(true);
    try {
      const response = await axios.post("/api/generate-audio", { script });
      setAudioUrl(response.data.audioUrl);
    } catch (error) {
      alert("Error generating audio");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardContent>
          <h2 className="text-xl font-bold mb-4">AI-Powered Podcast Generator</h2>
          <Input
            type="text"
            placeholder="Enter Podcast Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mb-4"
          />
          <Button onClick={generateScript} disabled={loading || !topic}>
            Generate Script
          </Button>
          {script && (
            <>
              <Textarea value={script} readOnly className="mt-4" rows={6} />
              <Button onClick={generateAudio} disabled={loading} className="mt-4">
                Convert to Audio
              </Button>
            </>
          )}
          {audioUrl && (
            <audio controls className="mt-4">
              <source src={audioUrl} type="audio/mpeg" />
            </audio>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
