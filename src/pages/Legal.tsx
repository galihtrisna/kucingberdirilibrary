import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, FileText, AlertTriangle, Mail } from "lucide-react";

const Legal = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Informasi Legal
        </h1>
        <p className="text-xl text-gray-600">
          Ketentuan layanan, kebijakan privasi, dan informasi hak cipta untuk
          KBOeL
        </p>
      </div>

      <div className="space-y-8">
        {/* Ketentuan Layanan */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Ketentuan Layanan
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    1. Persetujuan Ketentuan
                  </h3>
                  <p>
                    Dengan mengakses dan menggunakan KucingBerdiri OpenLibrary
                    (KBOeL), Anda menyetujui ketentuan yang berlaku. Jika Anda
                    tidak setuju, harap tidak menggunakan layanan ini.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    2. Lisensi Penggunaan
                  </h3>
                  <p>
                    Anda diizinkan mengunduh satu salinan materi dari KBOeL
                    untuk penggunaan pribadi dan sementara. Ini adalah lisensi,
                    bukan pemindahan hak. Anda tidak boleh:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>mengubah atau menyalin materi</li>
                    <li>menggunakannya untuk tujuan komersial atau publik</li>
                    <li>
                      membongkar atau membalikkan rekayasa perangkat lunak
                    </li>
                    <li>
                      menghapus hak cipta atau catatan kepemilikan lainnya
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    3. Akun Pengguna
                  </h3>
                  <p>
                    Saat membuat akun, Anda wajib memberikan data yang akurat
                    dan terkini. Anda bertanggung jawab menjaga keamanan sandi
                    dan seluruh aktivitas di akun Anda.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    4. Pedoman Konten
                  </h3>
                  <p>
                    Pengguna dapat mengunggah konten edukatif, jurnal, dan buku
                    yang:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Bebas hak cipta atau sudah memiliki izin lisensi</li>
                    <li>Bersifat edukatif atau informatif</li>
                    <li>Tidak mengandung malware atau konten berbahaya</li>
                    <li>Sesuai untuk semua usia dan budaya</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    5. Penggunaan yang Dilarang
                  </h3>
                  <p>Anda tidak boleh menggunakan layanan kami untuk:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>
                      tujuan ilegal atau mengajak orang lain melakukan hal
                      tersebut
                    </li>
                    <li>
                      melanggar hukum lokal, nasional, maupun internasional
                    </li>
                    <li>
                      melanggar hak kekayaan intelektual kami atau pihak lain
                    </li>
                    <li>
                      melecehkan, mencemarkan nama baik, atau mendiskriminasi
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    6. Penyangkalan
                  </h3>
                  <p>
                    Materi di KBOeL disediakan "sebagaimana adanya". Kami tidak
                    memberikan jaminan apa pun, baik tersurat maupun tersirat,
                    termasuk kelayakan untuk tujuan tertentu atau tidak
                    melanggar hak pihak lain.
                  </p>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Kebijakan Privasi */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Kebijakan Privasi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-96">
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    1. Informasi yang Kami Kumpulkan
                  </h3>
                  <p>
                    Kami mengumpulkan informasi yang Anda berikan, seperti saat
                    membuat akun, mengunggah konten, atau menghubungi kami. Ini
                    dapat mencakup:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Nama dan informasi kontak</li>
                    <li>Kredensial akun</li>
                    <li>Konten yang Anda unggah</li>
                    <li>Komunikasi dengan kami</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    2. Penggunaan Informasi
                  </h3>
                  <p>Kami menggunakan informasi Anda untuk:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Menyediakan dan meningkatkan layanan</li>
                    <li>Memproses transaksi dan mengirimkan notifikasi</li>
                    <li>Mengirim pemberitahuan teknis dan bantuan</li>
                    <li>Berkomunikasi tentang produk, layanan, dan acara</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    3. Berbagi Informasi
                  </h3>
                  <p>
                    Kami tidak menjual atau membagikan informasi pribadi Anda ke
                    pihak ketiga tanpa persetujuan, kecuali dalam kasus:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Dengan persetujuan Anda</li>
                    <li>Untuk alasan hukum</li>
                    <li>Untuk melindungi hak dan keamanan</li>
                    <li>Dengan penyedia layanan kami</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    4. Keamanan Data
                  </h3>
                  <p>
                    Kami menggunakan langkah keamanan yang sesuai untuk
                    melindungi informasi pribadi Anda, meskipun tidak ada metode
                    online yang 100% aman.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    5. Hak Anda
                  </h3>
                  <p>Anda berhak untuk:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1">
                    <li>Mengakses informasi pribadi Anda</li>
                    <li>Memperbaiki informasi yang salah</li>
                    <li>Meminta penghapusan informasi</li>
                    <li>Menolak pemrosesan informasi</li>
                  </ul>
                </div>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Kebijakan Hak Cipta */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Kebijakan Hak Cipta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Kepatuhan Hak Cipta
                </h3>
                <p>
                  KBOeL menghormati hak kekayaan intelektual dan mengharapkan
                  pengguna melakukan hal yang sama. Kami akan menghapus konten
                  pelanggar hak cipta dan memblokir pelanggar berulang.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Pemberitahuan DMCA
                </h3>
                <p>
                  Jika Anda merasa karya Anda dilanggar, mohon kirim informasi
                  berikut ke agen hak cipta kami:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Tanda tangan fisik atau elektronik pemilik hak cipta</li>
                  <li>Identifikasi karya yang dilanggar</li>
                  <li>Lokasi materi pelanggar</li>
                  <li>Informasi kontak Anda</li>
                  <li>Pernyataan keyakinan pelanggaran</li>
                  <li>Pernyataan keakuratan informasi</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">
                  Konten yang Diterima
                </h3>
                <p>Kami mendorong berbagi konten seperti:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Karya domain publik</li>
                  <li>Konten berlisensi Creative Commons</li>
                  <li>Karya orisinal milik pengunggah</li>
                  <li>Konten dengan izin lisensi yang sah</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Kontak Kami */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Mail className="h-5 w-5" />
              Hubungi Kami
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                Jika Anda memiliki pertanyaan tentang Ketentuan Layanan,
                Kebijakan Privasi, atau Kebijakan Hak Cipta, silakan hubungi
                kami:
              </p>

              <div className="bg-gray-50 p-4 rounded">
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Legal;
