import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Textarea } from '../../components/ui/Textarea';
import { Button } from '../../components/ui/Button';
import { useToast } from '../../context/ToastContext';
import { isValidEmail } from '../../utils/validators';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSent, setIsSent] = useState(false);
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Name is required';
    if (!isValidEmail(formData.email)) errs.email = 'Valid email is required';
    if (!formData.message.trim()) errs.message = 'Message content is required';

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsSent(true);
    toast.success('Inquiry Transmitted', 'Our design concierge will review your message within 24 hours.');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 w-full flex-1 text-[#000000] dark:text-[#FFFFFF]">
      <div className="mb-10 sm:mb-12">
        <span className="text-[10px] font-mono uppercase tracking-widest text-[#444444] dark:text-[#CCCCCC] block mb-2">
          Concierge Inquiries
        </span>
        <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#000000] dark:text-[#FFFFFF]">
          Direct Communication
        </h1>
        <p className="text-xs sm:text-sm text-[#444444] dark:text-[#CCCCCC] mt-2 max-w-xl">
          Connect with our design curators regarding bespoke sizing, private allocations, or consignment dispatch status.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Contact Information (5 cols) */}
        <div className="md:col-span-5 space-y-6 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 text-xs font-mono">
          <div>
            <h3 className="font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF]" /> Physical Atelier
            </h3>
            <p className="text-[#444444] dark:text-[#CCCCCC] leading-relaxed">
              MONO™ Design Architecture<br />
              420 West Broadway, Loft 4B<br />
              SoHo, New York, NY 10012
            </p>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-2 flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF]" /> Electronic Mail
            </h3>
            <p className="text-[#444444] dark:text-[#CCCCCC] leading-relaxed">
              concierge@mono-atelier.com<br />
              curations@mono-atelier.com
            </p>
          </div>

          <div>
            <h3 className="font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF] mb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#000000] dark:text-[#FFFFFF]" /> Concierge Direct
            </h3>
            <p className="text-[#444444] dark:text-[#CCCCCC] leading-relaxed">
              +1 (800) 555-0199<br />
              Monday - Friday, 09:00 - 18:00 EST
            </p>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="md:col-span-7 bg-[#F5F5F5] dark:bg-[#111111] border border-[#DDDDDD] dark:border-[#333333] rounded-card p-6 sm:p-8 shadow-subtle">
          {isSent ? (
            <div className="py-12 text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#000000] dark:text-[#FFFFFF] mx-auto" />
              <h3 className="text-base font-bold uppercase tracking-wider text-[#000000] dark:text-[#FFFFFF]">
                Transmission Logged
              </h3>
              <p className="text-xs text-[#444444] dark:text-[#CCCCCC] max-w-sm mx-auto">
                Thank you for your message. A curator has received your inquiry and will respond to {formData.email}.
              </p>
              <Button variant="outline" size="sm" onClick={() => setIsSent(false)}>
                Send Another Dispatch
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                error={errors.name}
                placeholder="Alexander Wright"
              />

              <Input
                label="Email Address"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                error={errors.email}
                placeholder="alexander@domain.com"
              />

              <Input
                label="Subject / Topic"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="e.g. Sizing query regarding Commando Derby"
              />

              <Textarea
                label="Message Details"
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                error={errors.message}
                placeholder="State your question or inquiry with as much clarity as possible..."
              />

              <Button type="submit" variant="primary" size="md" icon={Send} fullWidth>
                Transmit Inquiry
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
