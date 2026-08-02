import React, { useState, useEffect } from 'react';
import { 
  Presentation, 
  Sparkles, 
  ExternalLink, 
  LogOut, 
  FolderOpen, 
  CheckCircle2, 
  Loader2, 
  FileCheck, 
  Search, 
  Eye, 
  Info, 
  AlertCircle,
  X
} from 'lucide-react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout } from '../lib/googleAuth';
import { 
  listUserPresentations, 
  createRevenueStreamlineDeck, 
  SlideFile 
} from '../lib/googleSlidesService';

export const GoogleSlidesIntegration: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);

  // Export state
  const [showExportModal, setShowExportModal] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);
  const [exportSuccessLink, setExportSuccessLink] = useState<string | null>(null);
  const [exportError, setExportError] = useState<string | null>(null);

  // Drive Presentations state
  const [drivePresentations, setDrivePresentations] = useState<SlideFile[]>([]);
  const [isLoadingDrive, setIsLoadingDrive] = useState<boolean>(false);
  const [selectedPresentationId, setSelectedPresentationId] = useState<string | null>(null);
  const [customSlideUrl, setCustomSlideUrl] = useState<string>('');
  const [showDriveModal, setShowDriveModal] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, token) => {
        setUser(currentUser);
        setAccessToken(token);
        setIsLoadingAuth(false);
      },
      () => {
        setUser(null);
        setAccessToken(null);
        setIsLoadingAuth(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleSignIn = async () => {
    setAuthError(null);
    setIsLoadingAuth(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setAccessToken(res.accessToken);
      }
    } catch (err: any) {
      console.error('Sign-in error:', err);
      setAuthError(err.message || 'Failed to sign in with Google Workspace');
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setAccessToken(null);
    setDrivePresentations([]);
    setSelectedPresentationId(null);
  };

  const handleFetchDrivePresentations = async () => {
    if (!accessToken) return;
    setIsLoadingDrive(true);
    setShowDriveModal(true);
    try {
      const files = await listUserPresentations(accessToken);
      setDrivePresentations(files);
    } catch (err: any) {
      console.error('Drive fetch error:', err);
    } finally {
      setIsLoadingDrive(false);
    }
  };

  const handleConfirmExport = async () => {
    if (!accessToken) return;
    setIsExporting(true);
    setExportError(null);
    try {
      const result = await createRevenueStreamlineDeck(accessToken);
      setExportSuccessLink(result.webViewLink);
      setSelectedPresentationId(result.presentationId);
      setShowExportModal(false);
    } catch (err: any) {
      console.error('Export error:', err);
      setExportError(err.message || 'Failed to export to Google Slides');
    } finally {
      setIsExporting(false);
    }
  };

  const handleLoadCustomUrl = () => {
    if (!customSlideUrl) return;
    // Extract ID from URL if full link pasted
    const match = customSlideUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      setSelectedPresentationId(match[1]);
    } else {
      setSelectedPresentationId(customSlideUrl.trim());
    }
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
      {/* Top Banner & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 shrink-0">
            <Presentation className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-sans font-bold text-lg text-white">Google Slides Integration</h3>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono text-[10px] uppercase font-semibold border border-amber-500/30">
                Workspace API Connected
              </span>
            </div>
            <p className="font-sans text-xs text-slate-400">
              Export RevOps case studies directly to Google Drive presentations or view Google Slides decks in-app.
            </p>
          </div>
        </div>

        {/* Auth status or Sign-in button */}
        <div className="flex items-center gap-3">
          {user && accessToken ? (
            <div className="flex items-center gap-3 bg-slate-950 border border-slate-800 px-3 py-1.5 rounded-xl">
              {user.photoURL ? (
                <img src={user.photoURL} alt={user.displayName || 'User'} className="w-7 h-7 rounded-full border border-sky-500" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-sky-600 text-white flex items-center justify-center text-xs font-bold">
                  {user.displayName?.[0] || 'U'}
                </div>
              )}
              <div className="text-left hidden sm:block">
                <div className="text-xs font-bold text-white leading-tight">{user.displayName || 'Connected User'}</div>
                <div className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" /> Workspace Auth Active
                </div>
              </div>
              <button
                onClick={handleLogout}
                title="Sign out of Google Workspace"
                className="p-1.5 text-slate-400 hover:text-red-400 transition-colors ml-1"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={handleSignIn}
              disabled={isLoadingAuth}
              className="gsi-material-button flex items-center gap-2.5 bg-white hover:bg-slate-100 text-slate-800 px-4 py-2 rounded-xl text-xs font-bold shadow transition-all cursor-pointer disabled:opacity-50"
            >
              {isLoadingAuth ? (
                <Loader2 className="h-4 w-4 animate-spin text-slate-600" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                </svg>
              )}
              <span>{isLoadingAuth ? 'Connecting...' : 'Sign in with Google'}</span>
            </button>
          )}
        </div>
      </div>

      {authError && (
        <div className="bg-red-950/60 border border-red-800 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
          <span>{authError}</span>
        </div>
      )}

      {/* Main Action Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Action 1: Export to Google Slides */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold">
              <Sparkles className="h-4 w-4" /> Export Presentation
            </div>
            <p className="text-xs text-slate-300 font-sans">
              Generate a formatted 14-slide presentation deck directly in your personal Google Drive.
            </p>
          </div>
          <button
            onClick={() => {
              if (!accessToken) {
                handleSignIn();
              } else {
                setShowExportModal(true);
              }
            }}
            className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-sans font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer shadow"
          >
            <Presentation className="h-4 w-4" />
            <span>Export to Google Slides</span>
          </button>
        </div>

        {/* Action 2: Browse Drive Decks */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold">
              <FolderOpen className="h-4 w-4" /> Drive Slide Decks
            </div>
            <p className="text-xs text-slate-300 font-sans">
              List and open existing Google Presentations from your connected Google Drive account.
            </p>
          </div>
          <button
            onClick={() => {
              if (!accessToken) {
                handleSignIn();
              } else {
                handleFetchDrivePresentations();
              }
            }}
            className="w-full bg-slate-800 hover:bg-slate-700 text-white font-sans font-bold text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-700"
          >
            <FolderOpen className="h-4 w-4 text-sky-400" />
            <span>Browse Google Drive Decks</span>
          </button>
        </div>

        {/* Action 3: Load or Paste URL */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl flex flex-col justify-between space-y-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-teal-400 font-mono text-xs font-bold">
              <Eye className="h-4 w-4" /> Embed Presentation ID
            </div>
            <p className="text-xs text-slate-300 font-sans">
              Paste a Google Presentation ID or URL to view and present live in this dashboard.
            </p>
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste Google Presentation URL or ID..."
              value={customSlideUrl}
              onChange={(e) => setCustomSlideUrl(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 text-xs text-white px-2.5 py-1.5 rounded-lg focus:outline-none focus:border-sky-500 font-mono"
            />
            <button
              onClick={handleLoadCustomUrl}
              disabled={!customSlideUrl}
              className="bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg disabled:opacity-40 transition-colors cursor-pointer"
            >
              Load
            </button>
          </div>
        </div>
      </div>

      {/* Export Confirmation Modal (MANDATORY User Confirmation for Workspace operations) */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative">
            <button
              onClick={() => setShowExportModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-start gap-4">
              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400 shrink-0">
                <Presentation className="h-8 w-8" />
              </div>
              <div className="space-y-1">
                <h4 className="font-sans font-bold text-lg text-white">Create Presentation in Google Drive?</h4>
                <p className="font-sans text-xs text-slate-300 leading-relaxed">
                  This action will generate a new Google Slides presentation titled <strong className="text-amber-300">"Revenue Systems Streamline Initiative — Bao You Portfolio"</strong> containing 14 detailed architecture slides in your connected Google Drive account.
                </p>
              </div>
            </div>

            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs font-sans text-slate-300">
              <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-sky-400">
                <Info className="h-4 w-4" /> Workspace Permission Scope:
              </div>
              <p className="text-[11px] leading-relaxed">
                Will create a presentation file in your Google Drive under <code className="bg-slate-900 text-amber-300 px-1 py-0.5 rounded">https://www.googleapis.com/auth/presentations</code> and <code className="bg-slate-900 text-sky-300 px-1 py-0.5 rounded">https://www.googleapis.com/auth/drive.file</code> with your permission.
              </p>
            </div>

            {exportError && (
              <div className="bg-red-950/80 border border-red-700 text-red-200 text-xs p-3 rounded-xl">
                {exportError}
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowExportModal(false)}
                disabled={isExporting}
                className="px-4 py-2 text-xs font-bold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExport}
                disabled={isExporting}
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Building Google Slides Deck...</span>
                  </>
                ) : (
                  <>
                    <FileCheck className="h-4 w-4" />
                    <span>Confirm &amp; Create in Drive</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Banner */}
      {exportSuccessLink && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 text-emerald-400 shrink-0" />
            <div>
              <div className="text-xs font-bold text-white font-sans">Presentation Successfully Created in Google Drive!</div>
              <div className="text-[11px] text-emerald-300 font-mono">14 architectural slides exported to Google Slides</div>
            </div>
          </div>
          <a
            href={exportSuccessLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-xs px-4 py-2 rounded-lg flex items-center gap-2 transition-all shrink-0 shadow"
          >
            <span>Open in Google Slides</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      )}

      {/* Drive Presentations Modal / Drawer */}
      {showDriveModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 text-sky-400 font-mono text-xs font-bold">
                <FolderOpen className="h-5 w-5" /> Your Google Drive Presentations
              </div>
              <button
                onClick={() => setShowDriveModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 pr-1">
              {isLoadingDrive ? (
                <div className="py-12 text-center text-slate-400 text-xs flex flex-col items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-sky-400" />
                  <span>Scanning Google Drive for presentation decks...</span>
                </div>
              ) : drivePresentations.length === 0 ? (
                <div className="py-10 text-center text-slate-400 text-xs space-y-2">
                  <p>No Google Slides presentations found in your connected Google Drive.</p>
                  <p className="text-[11px] text-slate-500">Click "Export to Google Slides" above to create one!</p>
                </div>
              ) : (
                drivePresentations.map((file) => (
                  <div
                    key={file.id}
                    onClick={() => {
                      setSelectedPresentationId(file.id);
                      setShowDriveModal(false);
                    }}
                    className="p-3.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-sky-500/50 rounded-xl flex items-center justify-between gap-3 cursor-pointer transition-all"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Presentation className="h-5 w-5 text-amber-400 shrink-0" />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate font-sans">{file.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">
                          Modified: {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : 'N/A'}
                        </div>
                      </div>
                    </div>
                    <button className="bg-sky-500/10 text-sky-300 hover:bg-sky-500 hover:text-white px-3 py-1 rounded-lg text-xs font-bold transition-colors shrink-0">
                      View Deck
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* Embedded Google Slides Player View */}
      {selectedPresentationId && (
        <div className="bg-slate-950 border border-amber-500/40 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-mono text-xs font-bold text-amber-400">Live Embedded Google Slides View</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={`https://docs.google.com/presentation/d/${selectedPresentationId}/edit`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-sky-400 hover:text-sky-300 font-mono flex items-center gap-1 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg transition-colors"
              >
                <span>Edit in Google Slides</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <button
                onClick={() => setSelectedPresentationId(null)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1"
              >
                Close View
              </button>
            </div>
          </div>

          <div className="aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black shadow-2xl relative">
            <iframe
              src={`https://docs.google.com/presentation/d/${selectedPresentationId}/embed?start=false&loop=false&delayms=3000`}
              className="w-full h-full border-0"
              allowFullScreen={true}
              title="Google Slides Presentation"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};
