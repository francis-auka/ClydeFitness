"use client";
import { useState } from "react";
import { MapPin, Clock } from "lucide-react";
import RegistrationModal from "./RegistrationModal";

interface EventData {
  _id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  disciplines: string[];
  price: number;
  maxSlots: number;
  bookedSlots: number;
  deadline: string;
  coverImage?: string;
}

export default function EventCard({ event }: { event: EventData }) {
  const [modalOpen, setModalOpen] = useState(false);
  const now = new Date();
  const deadline = new Date(event.deadline);
  const eventDate = new Date(event.date);
  const remaining = event.maxSlots - event.bookedSlots;
  const pct = remaining / event.maxSlots;
  const isFull = remaining <= 0;
  const isClosed = deadline < now;
  const isLow = !isFull && pct < 0.15;

  const dateObj = eventDate;
  const day = dateObj.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();
  const num = dateObj.getDate();
  const month = dateObj.toLocaleDateString("en-US", { month: "short" }).toUpperCase();

  return (
    <>
      <div className="bg-[#111111] flex flex-col hover:-translate-y-1 transition-transform duration-200">
        {/* Cover image */}
        <div className="relative aspect-[16/9] bg-[#1A1A1A]">
          {event.coverImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="font-barlow text-[#2A2A2A] text-xs uppercase tracking-widest">[ Session photo ]</p>
            </div>
          )}

          {/* Date badge */}
          <div className="absolute top-0 left-0 bg-green text-black p-3 flex flex-col items-center leading-none">
            <span className="font-bebas text-[13px]">{day}</span>
            <span className="font-bebas text-[28px]">{num}</span>
            <span className="font-bebas text-[13px]">{month}</span>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 flex flex-col flex-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {event.disciplines.map((d) => (
              <span key={d} className="border border-[#2A2A2A] font-barlow text-[11px] uppercase tracking-widest text-[#888888] px-2 py-0.5">
                {d}
              </span>
            ))}
          </div>

          <h3 className="font-barlow text-[22px] uppercase text-white mb-1">{event.title}</h3>
          <p className="font-dm-sans text-[14px] text-[#888888] line-clamp-2 mb-3">{event.description}</p>

          <div className="flex gap-4 mb-4">
            <div className="flex items-center gap-1.5">
              <MapPin size={13} className="text-[#888888]" />
              <span className="font-dm-sans text-[13px] text-[#888888]">{event.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={13} className="text-[#888888]" />
              <span className="font-dm-sans text-[13px] text-[#888888]">{event.time}</span>
            </div>
          </div>

          <div className="border-t border-[#2A2A2A] my-4" />

          <div className="flex items-end justify-between mb-4">
            <div>
              <span className="font-bebas text-[28px] text-white leading-none">
                KES {event.price.toLocaleString()}
              </span>
              <span className="font-dm-sans text-[13px] text-[#888888] ml-1">/ person</span>
            </div>
            <div>
              {isFull ? (
                <span className="bg-red/10 border border-red font-barlow text-[11px] uppercase tracking-widest text-red px-3 py-1">FULL</span>
              ) : isClosed ? (
                <span className="font-dm-sans text-[13px] text-[#888888]">CLOSED</span>
              ) : isLow ? (
                <span className="font-barlow text-[13px] text-amber">Only {remaining} left!</span>
              ) : (
                <span className="font-barlow text-[13px] text-green">{remaining} spots left</span>
              )}
            </div>
          </div>

          <button
            disabled={isFull || isClosed}
            onClick={() => setModalOpen(true)}
            className="w-full bg-green text-black font-barlow font-bold text-sm uppercase tracking-widest py-3 hover:bg-[#166534] transition-colors duration-200 disabled:bg-[#2A2A2A] disabled:text-[#888888] disabled:cursor-not-allowed mt-auto"
          >
            {isFull || isClosed ? "REGISTRATION CLOSED" : "REGISTER NOW →"}
          </button>
        </div>
      </div>

      {modalOpen && (
        <RegistrationModal
          event={{ _id: event._id, title: event.title }}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}
