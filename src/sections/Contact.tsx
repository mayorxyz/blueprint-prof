import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { contactCopy, site } from "../content";
import { SheetHeading } from "../components/SheetHeading";
import { Reveal } from "../components/Reveal";
import { useReducedMotion } from "../hooks/useReducedMotion";

type FormState = "idle" | "sending" | "success" | "error";

export function Contact() {
  const reduced = useReducedMotion();
  const [formState, setFormState] = useState<FormState>("idle");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [honeypot, setHoneypot] = useState("");

  const hasEmailJS =
    import.meta.env.VITE_EMAILJS_SERVICE_ID &&
    import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
    import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detected
    if (!formData.name || !formData.email || !formData.message) return;

    setFormState("sending");

    try {
      if (hasEmailJS) {
        const emailjs = await import("@emailjs/browser");
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
          },
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
        );
        setFormState("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Fallback to mailto
        const subject = `Portfolio contact from ${formData.name}`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`;
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        setFormState("success");
      }
    } catch {
      setFormState("error");
    }
  };

  return (
    <section id="contact" className="relative px-6 md:px-8 py-20 md:py-28">
      <div className="max-w-[1200px] mx-auto">
        <SheetHeading
          num="05"
          total={site.totalSheets}
          label={`SHEET 05 / ${String(site.totalSheets).padStart(2, "0")} — CONTACT`}
          title={contactCopy.heading}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: info */}
          <div>
            <Reveal>
              <p className="text-[var(--color-ink-dim)] leading-relaxed mb-8 max-w-[48ch]">
                {contactCopy.subtext}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="space-y-0 border border-[var(--color-line)]">
                {contactCopy.channels.map((ch, i) => (
                  <a
                    key={ch.label}
                    href={ch.href || "#"}
                    target={ch.href?.startsWith("http") ? "_blank" : undefined}
                    rel={ch.href?.startsWith("http") ? "noopener noreferrer" : undefined}
                    className={`flex items-center justify-between px-4 py-3 hover:bg-[var(--color-accent-dim)] group transition-colors ${
                      i > 0 ? "border-t border-[var(--color-line)]" : ""
                    }`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-ink-faint)]">
                      {ch.label}
                    </span>
                    <span className="font-mono text-[12px] text-[var(--color-ink-dim)] group-hover:text-[var(--color-accent)] transition-colors flex items-center gap-2">
                      {ch.value}
                      {ch.href && <span className="text-[var(--color-ink-faint)]">→</span>}
                    </span>
                  </a>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: form */}
          <div>
            <Reveal delay={0.15}>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <FormField
                  label={contactCopy.formLabels.name}
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(v) => setFormData({ ...formData, name: v })}
                  required
                />
                <FormField
                  label={contactCopy.formLabels.email}
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(v) => setFormData({ ...formData, email: v })}
                  required
                />
                <FormField
                  label={contactCopy.formLabels.message}
                  id="message"
                  type="textarea"
                  value={formData.message}
                  onChange={(v) => setFormData({ ...formData, message: v })}
                  required
                />

                <motion.button
                  type="submit"
                  disabled={formState === "sending"}
                  className="font-mono text-[11px] uppercase tracking-[0.08em] px-6 py-3 bg-[var(--color-accent)] text-[var(--color-bg)] font-medium hover:translate-y-[-2px] transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={reduced ? {} : { y: -2 }}
                  whileTap={reduced ? {} : { y: 0 }}
                >
                  {formState === "sending" ? "SENDING..." : contactCopy.formLabels.submit}
                </motion.button>

                {formState === "success" && (
                  <p className="font-mono text-[12px] text-[var(--color-ok)]">
                    {contactCopy.formLabels.success}
                  </p>
                )}
                {formState === "error" && (
                  <p className="font-mono text-[12px] text-red-400">
                    {contactCopy.formLabels.error}
                  </p>
                )}
              </form>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  id,
  type,
  value,
  onChange,
  required,
}: {
  label: string;
  id: string;
  type: "text" | "email" | "textarea";
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
}) {
  const baseClasses =
    "w-full bg-transparent border-b border-[var(--color-line)] focus:border-[var(--color-accent)] outline-none py-2 font-mono text-[13px] text-[var(--color-ink)] placeholder:text-[var(--color-ink-faint)] transition-colors";

  return (
    <div>
      <label htmlFor={id} className="block font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-ink-faint)] mb-2">
        {label} {required && <span className="text-[var(--color-accent)]">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          rows={4}
          className={`${baseClasses} resize-none`}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className={baseClasses}
          placeholder={`Enter ${label.toLowerCase()}...`}
        />
      )}
    </div>
  );
}
