import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Interfaces
interface Student {
  id: string;
  name: string;
  email: string;
}

interface ValidatedProposal {
  id: string;
  student: Student;
  title: string;
  description: string;
  domain: string;
  submittedDate: string;
  validatedDate: string;
  validationComment?: string;
  progress: number;
  status: 'in_progress' | 'completed' | 'on_hold';
}

interface ValidatedStats {
  total: number;
  thisWeek: number;
  assigned: number;
  domains: number;
}

@Component({
  selector: 'app-themes-valides',
  imports: [CommonModule, FormsModule],
  templateUrl: './themes-valides.component.html',
  styleUrl: './themes-valides.component.scss',
})
export class ThemesValidesComponent implements OnInit {
  selectedProposal: any = null;
  availableTutors: any[] = [];

  openTutorSelector(proposal: any) {
    this.selectedProposal = proposal;

    // Appel vers ton service pour charger les profs (mock temporaire ici)
    this.availableTutors = [
      { id: 1, name: 'Pr. Konan', email: 'konan@univ.edu' },
      { id: 2, name: 'Pr. Toure', email: 'toure@univ.edu' },
      { id: 3, name: 'Pr. Yao', email: 'yao@univ.edu' },
    ];

    // Remplace ce tableau statique par un appel réel à ton backend si tu veux
  }
  assignTutor(proposalId: string, tutorId: string) {
    console.log(`Assign tutor ${tutorId} to proposal ${proposalId}`);
    const tutor = this.availableTutors.find((t) => t.id === tutorId);
    alert(
      `✅ ${tutor.name} a été assigné comme tuteur pour la proposition "${this.selectedProposal.title}"`
    );

    // Exemple d'appel API :
    // this.http
    //   .put(`http://localhost:8000/api/proposals/${proposalId}/assign-tutor`, {
    //     tutorId: tutorId,
    //   })
    //   .subscribe({
    //     next: (res) => {
    //       alert('Tuteur assigné avec succès ✅');
    //       this.selectedProposal = null;
    //       // Actualise les données si besoin
    //     },
    //     error: (err) => {
    //       console.error(err);
    //       alert("Erreur lors de l'assignation");
    //     },
    //   });
  }
  // Données des propositions validées
  validatedProposals: ValidatedProposal[] = [
    {
      id: '1',
      student: {
        id: 'std001',
        name: 'Marie Dupont',
        email: 'marie.dupont@email.com',
      },
      title: 'Intelligence Artificielle en Éducation',
      description:
        "Étude de l'impact de l'IA sur les méthodes d'apprentissage modernes et développement d'un système d'aide à l'apprentissage personnalisé.",
      domain: 'Informatique',
      submittedDate: '2024-01-10',
      validatedDate: '2024-01-15',
      validationComment:
        "Excellent sujet, très pertinent pour l'époque actuelle. Bonne approche méthodologique.",
      progress: 75,
      status: 'in_progress',
    },
    {
      id: '2',
      student: {
        id: 'std002',
        name: 'Jean Martin',
        email: 'jean.martin@email.com',
      },
      title: 'Marketing Digital et Réseaux Sociaux',
      description:
        "Analyse de l'efficacité des campagnes marketing sur les plateformes sociales et développement d'une stratégie optimisée.",
      domain: 'Marketing',
      submittedDate: '2024-01-08',
      validatedDate: '2024-01-12',
      validationComment:
        'Sujet intéressant avec une approche pratique appréciable.',
      progress: 60,
      status: 'in_progress',
    },
    {
      id: '3',
      student: {
        id: 'std003',
        name: 'Sophie Bernard',
        email: 'sophie.bernard@email.com',
      },
      title: 'Blockchain et Services Financiers',
      description:
        "Impact de la technologie blockchain sur les services financiers traditionnels et perspectives d'évolution.",
      domain: 'Finance',
      submittedDate: '2024-01-05',
      validatedDate: '2024-01-10',
      progress: 90,
      status: 'in_progress',
    },
    {
      id: '4',
      student: {
        id: 'std004',
        name: 'Pierre Dubois',
        email: 'pierre.dubois@email.com',
      },
      title: 'Communication Interne en Entreprise',
      description:
        "Optimisation des processus de communication interne dans les grandes entreprises à l'ère du télétravail.",
      domain: 'Communication',
      submittedDate: '2023-12-20',
      validatedDate: '2023-12-28',
      progress: 100,
      status: 'completed',
    },
    {
      id: '5',
      student: {
        id: 'std005',
        name: 'Lucie Moreau',
        email: 'lucie.moreau@email.com',
      },
      title: 'Gestion Administrative Numérique',
      description:
        "Digitalisation des processus administratifs et impact sur l'efficacité organisationnelle.",
      domain: 'Administration',
      submittedDate: '2024-01-12',
      validatedDate: '2024-01-18',
      progress: 45,
      status: 'in_progress',
    },
  ];

  // Propositions filtrées
  filteredProposals: ValidatedProposal[] = [];

  // Statistiques
  validatedStats: ValidatedStats = {
    total: 0,
    thisWeek: 0,
    assigned: 0,
    domains: 0,
  };

  // Filtres
  domainFilter = 'all';
  dateFilter = 'all';
  searchTerm = '';

  // Tri
  sortField = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  // Vue
  viewMode: 'table' | 'cards' = 'table';

  // Pagination
  currentPage = 1;
  itemsPerPage = 10;

  ngOnInit() {
    this.updateStatistics();
    this.applyFilters();
  }

  // Calcul des statistiques
  updateStatistics() {
    this.validatedStats.total = this.validatedProposals.length;

    // Propositions validées cette semaine
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    this.validatedStats.thisWeek = this.validatedProposals.filter(
      (p) => new Date(p.validatedDate) >= oneWeekAgo
    ).length;

    // Étudiants assignés (unique)
    const uniqueStudents = new Set(
      this.validatedProposals.map((p) => p.student.id)
    );
    this.validatedStats.assigned = uniqueStudents.size;

    // Domaines couverts (unique)
    const uniqueDomains = new Set(this.validatedProposals.map((p) => p.domain));
    this.validatedStats.domains = uniqueDomains.size;
  }

  // Application des filtres
  applyFilters() {
    this.filteredProposals = this.validatedProposals.filter((proposal) => {
      const matchesDomain =
        this.domainFilter === 'all' || proposal.domain === this.domainFilter;

      let matchesDate = true;
      if (this.dateFilter !== 'all') {
        const proposalDate = new Date(proposal.validatedDate);
        const now = new Date();

        switch (this.dateFilter) {
          case 'week':
            const oneWeekAgo = new Date();
            oneWeekAgo.setDate(now.getDate() - 7);
            matchesDate = proposalDate >= oneWeekAgo;
            break;
          case 'month':
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(now.getMonth() - 1);
            matchesDate = proposalDate >= oneMonthAgo;
            break;
          case 'semester':
            const sixMonthsAgo = new Date();
            sixMonthsAgo.setMonth(now.getMonth() - 6);
            matchesDate = proposalDate >= sixMonthsAgo;
            break;
        }
      }

      const matchesSearch =
        this.searchTerm === '' ||
        proposal.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        proposal.student.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        proposal.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        proposal.domain.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesDomain && matchesDate && matchesSearch;
    });

    // Appliquer le tri si défini
    if (this.sortField) {
      this.applySorting();
    }

    // Réinitialiser la pagination
    this.currentPage = 1;
  }

  // Gestionnaires de filtres
  onDomainFilterChange(event: any) {
    this.domainFilter = event.target.value;
    this.applyFilters();
  }

  onDateFilterChange(event: any) {
    this.dateFilter = event.target.value;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  // Tri
  sortBy(field: string) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applySorting();
  }

  applySorting() {
    this.filteredProposals.sort((a, b) => {
      let valueA: any;
      let valueB: any;

      switch (this.sortField) {
        case 'student':
          valueA = a.student.name.toLowerCase();
          valueB = b.student.name.toLowerCase();
          break;
        case 'title':
          valueA = a.title.toLowerCase();
          valueB = b.title.toLowerCase();
          break;
        case 'domain':
          valueA = a.domain.toLowerCase();
          valueB = b.domain.toLowerCase();
          break;
        case 'validatedDate':
          valueA = new Date(a.validatedDate);
          valueB = new Date(b.validatedDate);
          break;
        default:
          return 0;
      }

      if (valueA < valueB) {
        return this.sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return this.sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  // Vue
  setViewMode(mode: 'table' | 'cards') {
    this.viewMode = mode;
  }

  // Actions
  viewDetails(proposal: ValidatedProposal) {
    console.log('Voir détails:', proposal);
    // Implémenter l'ouverture d'une modal ou navigation vers page détail
  }

  downloadProposal(proposal: ValidatedProposal) {
    console.log('Télécharger:', proposal);
    // Implémenter le téléchargement PDF
  }

  sendMessage(proposal: ValidatedProposal) {
    console.log('Envoyer message à:', proposal.student);
    // Implémenter l'envoi de message
  }

  // Utilitaires
  getTimeSince(date: string): string {
    const now = new Date();
    const validatedDate = new Date(date);
    const diffTime = Math.abs(now.getTime() - validatedDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return 'Hier';
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    if (diffDays < 30) return `Il y a ${Math.ceil(diffDays / 7)} semaine(s)`;
    return `Il y a ${Math.ceil(diffDays / 30)} mois`;
  }

  getProgressStatus(progress: number): string {
    if (progress === 100) return 'Terminé';
    if (progress >= 75) return 'Presque fini';
    if (progress >= 50) return 'En cours';
    if (progress >= 25) return 'Démarré';
    return 'Début';
  }

  clearFilters() {
    this.domainFilter = 'all';
    this.dateFilter = 'all';
    this.searchTerm = '';
    this.sortField = '';
    this.applyFilters();
  }

  // Pagination
  getTotalPages(): number {
    return Math.ceil(this.filteredProposals.length / this.itemsPerPage);
  }

  getStartIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  getEndIndex(): number {
    return Math.min(
      this.getStartIndex() + this.itemsPerPage,
      this.filteredProposals.length
    );
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      this.currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  }

  // TrackBy pour optimiser les performances
  trackByProposal(index: number, proposal: ValidatedProposal): string {
    return proposal.id;
  }
}
