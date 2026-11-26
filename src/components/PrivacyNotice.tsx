import { Link } from 'react-router-dom';

interface PrivacyNoticeProps {
  purpose: string;
  retention: string;
}

const PrivacyNotice = ({ purpose, retention }: PrivacyNoticeProps) => (
  <p className="text-xs text-muted-foreground">
    We use your name, email and message only to {purpose} (legal basis: legitimate interest, GDPR Art. 6(1)(f)).
    We keep it {retention}, never share it with third parties for marketing, and you can ask us to access or
    delete it at any time. See our{' '}
    <Link to="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
  </p>
);

export default PrivacyNotice;
