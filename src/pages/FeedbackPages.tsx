import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PageHeader } from '../components/layout/PageHeader';
import { FormCard } from '../components/ui/FormCard';
import { FieldLabel, PrimaryButton, TextArea } from '../components/ui/FormFields';
import { useReport } from '../context/ReportContext';

function MessageFormPage({
  title,
  reportType,
  placeholder,
}: {
  title: string;
  reportType: 'feedback' | 'suggestion';
  placeholder: string;
}) {
  const navigate = useNavigate();
  const { addSubmission } = useReport();
  const [message, setMessage] = useState('');

  const submit = () => {
    addSubmission(reportType, title, message);
    navigate(`/success?type=${reportType}`);
  };

  return (
    <div className="min-h-screen bg-white pb-28">
      <PageHeader title={title} />
      <div className="px-4 py-4">
        <FormCard>
          <FieldLabel label="Your message" required />
          <TextArea rows={6} placeholder={placeholder} value={message} onChange={(e) => setMessage(e.target.value)} />
        </FormCard>
      </div>
      <div className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 px-4 py-4 safe-bottom">
        <PrimaryButton onClick={submit} disabled={!message.trim()}>Send</PrimaryButton>
      </div>
    </div>
  );
}

export function FeedbackPage() {
  const [params] = useSearchParams();
  const isImage = params.get('type') === 'image';

  if (isImage) {
    return (
      <MessageFormPage
        title="Report image"
        reportType="feedback"
        placeholder="Describe what's wrong with this image (outdated, incorrect, inappropriate...)..."
      />
    );
  }

  return (
    <MessageFormPage
      title="Report a problem"
      reportType="feedback"
      placeholder="Describe what's wrong with this place or page..."
    />
  );
}

export function SuggestionPage() {
  return (
    <MessageFormPage
      title="Leave a suggestion"
      reportType="suggestion"
      placeholder="Share your ideas to improve this listing..."
    />
  );
}

/** 详情页体验打分 */
export function RatePage() {
  const navigate = useNavigate();
  const { addSubmission } = useReport();
  const [score, setScore] = useState(0);

  const submit = () => {
    addSubmission('rate', 'Rate this page', `Score: ${score}/5`);
    navigate('/success?type=rate');
  };

  return (
    <div className="min-h-screen bg-white pb-28">
      <PageHeader title="Rate this page" />
      <div className="px-4 py-8 text-center">
        <p className="mb-6 text-[15px] text-neutral-600">How useful was this POI detail page?</p>
        <div className="flex justify-center gap-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setScore(n)}
              className={`text-3xl transition ${n <= score ? 'scale-110' : 'opacity-30'}`}
            >
              ⭐
            </button>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-1/2 w-full max-w-phone -translate-x-1/2 px-4 py-4 safe-bottom">
        <PrimaryButton onClick={submit} disabled={score === 0}>Submit rating</PrimaryButton>
      </div>
    </div>
  );
}
