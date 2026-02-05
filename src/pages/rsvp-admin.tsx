import { useState, useEffect } from "react";
import Head from "next/head";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { PageHeaderSection } from "@/components/page-header";
import Preloader from "@/components/preloader";
import "@/styles/globals.css";
import {
  Download,
  Users,
  CheckCircle,
  XCircle,
  Phone,
  MessageSquare,
  Calendar,
  AlertCircle,
  Loader,
} from "lucide-react";
import * as XLSX from "xlsx";

interface Guest {
  id: string;
  guest_name: string;
}

interface RSVPRecord {
  id: string;
  primary_guest_name: string;
  phone_number: string | null;
  will_attend: boolean;
  special_message: string | null;
  created_at: string;
  rsvp_guests?: Guest[];
}

export default function RSVPAdminPage() {
  const [rsvps, setRsvps] = useState<RSVPRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchRSVPs();
  }, []);

  const fetchRSVPs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/rsvp-list");
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to fetch RSVPs");
      }

      setRsvps(result.data || []);
    } catch (err) {
      console.error("Error fetching RSVPs:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load RSVP data"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const exportToExcel = () => {
    try {
      // Prepare data for export
      const exportData = rsvps.flatMap((rsvp) => {
        const guests = rsvp.rsvp_guests || [];
        const rows: any[] = [];

        // Add primary guest row
        rows.push({
          "Primary Guest": rsvp.primary_guest_name,
          "Additional Guest": "",
          "Attending": rsvp.will_attend ? "Yes" : "No",
          "Phone": rsvp.phone_number || "-",
          "Special Message": rsvp.special_message || "-",
          "Date Submitted": new Date(rsvp.created_at).toLocaleDateString(),
        });

        // Add additional guests rows
        guests.forEach((guest) => {
          rows.push({
            "Primary Guest": "",
            "Additional Guest": guest.guest_name,
            "Attending": "",
            "Phone": "",
            "Special Message": "",
            "Date Submitted": "",
          });
        });

        return rows;
      });

      // Create workbook and worksheet
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "RSVP List");

      // Set column widths
      const columnWidths = [
        { wch: 25 }, // Primary Guest
        { wch: 25 }, // Additional Guest
        { wch: 12 }, // Attending
        { wch: 15 }, // Phone
        { wch: 30 }, // Special Message
        { wch: 15 }, // Date Submitted
      ];
      worksheet["!cols"] = columnWidths;

      // Generate filename with date
      const dateStr = new Date().toISOString().split("T")[0];
      const filename = `RSVP-List-${dateStr}.xlsx`;

      // Download file
      XLSX.writeFile(workbook, filename);
    } catch (err) {
      console.error("Error exporting to Excel:", err);
      setError("Failed to export data to Excel");
    }
  };

  const filteredRSVPs = rsvps.filter(
    (rsvp) =>
      rsvp.primary_guest_name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      rsvp.phone_number?.includes(searchTerm) ||
      rsvp.rsvp_guests?.some((guest) =>
        guest.guest_name.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const attendingCount = rsvps.filter((rsvp) => rsvp.will_attend).length;
  const totalGuests = rsvps.reduce(
    (acc, rsvp) => acc + (rsvp.rsvp_guests?.length || 0) + 1,
    0
  );

  return (
    <>
      <Head>
        <title>RSVP Admin - Marvin &amp; Jovelyn&rsquo;s Wedding</title>
        <meta
          name="description"
          content="View and manage all RSVP entries for the wedding"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Preloader />
      <NavBar />

      <main className="min-h-screen bg-slate-50 text-slate-900">
        <PageHeaderSection title="RSVP Admin Dashboard" />

        <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-slate-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">
                    Total RSVPs
                  </p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">
                    {rsvps.length}
                  </p>
                </div>
                <Users className="w-12 h-12 text-slate-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">
                    Attending
                  </p>
                  <p className="text-4xl font-bold text-green-600 mt-2">
                    {attendingCount}
                  </p>
                </div>
                <CheckCircle className="w-12 h-12 text-green-400" />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-slate-600">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 font-medium">
                    Total Guests
                  </p>
                  <p className="text-4xl font-bold text-slate-900 mt-2">
                    {totalGuests}
                  </p>
                </div>
                <Users className="w-12 h-12 text-slate-400" />
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <input
                type="text"
                placeholder="Search by name, phone, or guest..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-700 focus:border-transparent"
              />
              <button
                onClick={exportToExcel}
                disabled={rsvps.length === 0 || isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-700 to-slate-600 hover:from-slate-800 hover:to-slate-700 disabled:from-slate-400 disabled:to-slate-400 text-white font-semibold rounded-lg transition-all duration-300"
              >
                <Download className="w-5 h-5" />
                Export to Excel
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader className="w-8 h-8 text-slate-700 animate-spin" />
              <p className="mt-4 text-slate-600">Loading RSVP data...</p>
            </div>
          )}

          {/* RSVP List */}
          {!isLoading && filteredRSVPs.length > 0 && (
            <div className="space-y-4">
              {filteredRSVPs.map((rsvp) => (
                <div
                  key={rsvp.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden border border-slate-200"
                >
                  <div className="p-6">
                    {/* Primary Guest Info */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-slate-900 mb-1">
                            {rsvp.primary_guest_name}
                          </h3>
                          <div className="flex items-center gap-4 flex-wrap">
                            <div
                              className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                                rsvp.will_attend
                                  ? "bg-green-100 text-green-800"
                                  : "bg-slate-100 text-slate-800"
                              }`}
                            >
                              {rsvp.will_attend ? (
                                <>
                                  <CheckCircle className="w-4 h-4" />
                                  Attending
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-4 h-4" />
                                  Not Attending
                                </>
                              )}
                            </div>

                            {rsvp.phone_number && (
                              <div className="flex items-center gap-2 text-slate-600">
                                <Phone className="w-4 h-4" />
                                <span className="text-sm">{rsvp.phone_number}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 text-slate-600">
                              <Calendar className="w-4 h-4" />
                              <span className="text-sm">
                                {new Date(rsvp.created_at).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Special Message */}
                      {rsvp.special_message && (
                        <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200">
                          <div className="flex gap-2">
                            <MessageSquare className="w-4 h-4 text-slate-600 flex-shrink-0 mt-0.5" />
                            <p className="text-sm text-slate-700 italic">
                              {rsvp.special_message}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Additional Guests */}
                    {rsvp.rsvp_guests && rsvp.rsvp_guests.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <p className="text-sm font-semibold text-slate-700 mb-3">
                          Additional Guests ({rsvp.rsvp_guests.length})
                        </p>
                        <div className="space-y-2">
                          {rsvp.rsvp_guests.map((guest) => (
                            <div
                              key={guest.id}
                              className="flex items-center gap-3 pl-4 py-2 bg-slate-50 rounded border border-slate-200"
                            >
                              <div className="w-2 h-2 bg-slate-400 rounded-full"></div>
                              <span className="text-sm text-slate-700">
                                {guest.guest_name}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredRSVPs.length === 0 && rsvps.length > 0 && (
            <div className="text-center py-12">
              <p className="text-slate-600">
                No RSVPs match your search criteria
              </p>
            </div>
          )}

          {/* No Data State */}
          {!isLoading && rsvps.length === 0 && !error && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 text-lg">
                No RSVP entries yet. Check back soon!
              </p>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
