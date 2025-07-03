import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Interfaces pour typer les données
interface Student {
  id: string;
  name: string;
  email: string;
}

interface Proposal {
  id: string;
  student: Student;
  title: string;
  description: string;
  domain: string;
  date: string;
  status: 'pending' | 'validated' | 'rejected';
  comment?: string;
}

interface Statistics {
  total: number;
  pending: number;
  validated: number;
  rejected: number;
}

interface Activity {
  id: string;
  type: 'new_proposal' | 'reminder' | 'validation' | 'rejection';
  message: string;
  date: string;
}

@Component({
  selector: 'app-professor-dashboad',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './professor-dashboad.component.html',
  styleUrl: './professor-dashboad.component.scss',
})
export class ProfessorDashboadComponent implements OnInit {
  // Données du professeur
  professorName = 'Dr. Martin Dubois';

  // Statistiques
  statistics: Statistics = {
    total: 0,
    pending: 0,
    validated: 0,
    rejected: 0,
  };

  // Liste des propositions
  proposals: Proposal[] = [
    {
      id: '1',
      student: {
        id: 'std1',
        name: 'Marie Dupont',
        email: 'marie.dupont@email.com',
      },
      title: 'Intelligence Artificielle en Éducation',
      description:
        "Étude de l'impact de l'IA sur les méthodes d'apprentissage modernes",
      domain: 'Informatique',
      date: '2024-01-15',
      status: 'pending',
    },
    {
      id: '2',
      student: {
        id: 'std2',
        name: 'Jean Martin',
        email: 'jean.martin@email.com',
      },
      title: 'Marketing Digital et Réseaux Sociaux',
      description:
        "Analyse de l'efficacité des campagnes marketing sur les plateformes sociales",
      domain: 'Marketing',
      date: '2024-01-12',
      status: 'pending',
    },
    {
      id: '3',
      student: {
        id: 'std3',
        name: 'Sophie Bernard',
        email: 'sophie.bernard@email.com',
      },
      title: 'Blockchain et Finance',
      description:
        'Impact de la blockchain sur les services financiers traditionnels',
      domain: 'Finance',
      date: '2024-01-10',
      status: 'validated',
    },
  ];

  // Propositions filtrées
  filteredProposals: Proposal[] = [];

  // Activités récentes
  activities: Activity[] = [
    {
      id: '1',
      type: 'new_proposal',
      message: 'Nouvelle proposition soumise par Marie Dupont',
      date: '2024-01-15 14:30',
    },
    {
      id: '2',
      type: 'reminder',
      message: 'Rappel: 3 propositions en attente de validation',
      date: '2024-01-14 09:00',
    },
  ];

  // États pour la gestion des commentaires
  showCommentSection: { [key: string]: boolean } = {};
  comments: { [key: string]: string } = {};

  // Filtres
  statusFilter = 'all';
  domainFilter = 'all';
  searchTerm = '';

  ngOnInit() {
    this.updateStatistics();
    this.applyFilters();
  }

  // Calcul des statistiques
  updateStatistics() {
    this.statistics.total = this.proposals.length;
    this.statistics.pending = this.proposals.filter(
      (p) => p.status === 'pending'
    ).length;
    this.statistics.validated = this.proposals.filter(
      (p) => p.status === 'validated'
    ).length;
    this.statistics.rejected = this.proposals.filter(
      (p) => p.status === 'rejected'
    ).length;
  }

  // Application des filtres
  applyFilters() {
    this.filteredProposals = this.proposals.filter((proposal) => {
      const matchesStatus =
        this.statusFilter === 'all' || proposal.status === this.statusFilter;
      const matchesDomain =
        this.domainFilter === 'all' || proposal.domain === this.domainFilter;
      const matchesSearch =
        this.searchTerm === '' ||
        proposal.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        proposal.student.name
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase()) ||
        proposal.description
          .toLowerCase()
          .includes(this.searchTerm.toLowerCase());

      return matchesStatus && matchesDomain && matchesSearch;
    });
  }

  // Gestionnaires d'événements pour les filtres
  onStatusFilterChange(event: any) {
    this.statusFilter = event.target.value;
    this.applyFilters();
  }

  onDomainFilterChange(event: any) {
    this.domainFilter = event.target.value;
    this.applyFilters();
  }

  onSearchChange(event: any) {
    this.searchTerm = event.target.value;
    this.applyFilters();
  }

  // **ACTIONS PRINCIPALES**

  // Valider une proposition
  validateProposal(proposalId: string) {
    const proposal = this.proposals.find((p) => p.id === proposalId);
    if (proposal && proposal.status === 'pending') {
      proposal.status = 'validated';

      // Ajouter une activité
      this.addActivity(
        'validation',
        `Proposition "${proposal.title}" validée pour ${proposal.student.name}`
      );

      // Mettre à jour les statistiques
      this.updateStatistics();
      this.applyFilters();

      // Masquer la section commentaire si elle était ouverte
      this.hideCommentSection(proposalId);

      // Ici vous pouvez ajouter l'appel à votre service pour notifier l'étudiant
      this.notifyStudent(proposal.student, 'validation', proposal.title);

      console.log(`Proposition ${proposalId} validée`);
    }
  }

  // Rejeter une proposition
  rejectProposal(proposalId: string) {
    const comment = this.comments[proposalId];

    if (!comment || comment.trim() === '') {
      alert('Un commentaire est obligatoire pour rejeter une proposition.');
      return;
    }

    const proposal = this.proposals.find((p) => p.id === proposalId);
    if (proposal && proposal.status === 'pending') {
      proposal.status = 'rejected';
      proposal.comment = comment.trim();

      // Ajouter une activité
      this.addActivity(
        'rejection',
        `Proposition "${proposal.title}" rejetée pour ${proposal.student.name}`
      );

      // Mettre à jour les statistiques
      this.updateStatistics();
      this.applyFilters();

      // Masquer la section commentaire
      this.hideCommentSection(proposalId);

      // Réinitialiser le commentaire
      this.comments[proposalId] = '';

      // Ici vous pouvez ajouter l'appel à votre service pour notifier l'étudiant
      this.notifyStudent(
        proposal.student,
        'rejection',
        proposal.title,
        comment
      );

      console.log(
        `Proposition ${proposalId} rejetée avec commentaire: ${comment}`
      );
    }
  }

  // Afficher/masquer la section commentaire
  toggleCommentSection(proposalId: string) {
    this.showCommentSection[proposalId] = !this.showCommentSection[proposalId];

    // Si on ouvre la section, initialiser le commentaire s'il n'existe pas
    if (this.showCommentSection[proposalId] && !this.comments[proposalId]) {
      this.comments[proposalId] = '';
    }
  }

  // Masquer la section commentaire
  hideCommentSection(proposalId: string) {
    this.showCommentSection[proposalId] = false;
  }

  // Confirmer le rejet avec commentaire
  confirmRejection(proposalId: string) {
    this.rejectProposal(proposalId);
  }

  // Annuler l'action de commentaire
  cancelComment(proposalId: string) {
    this.comments[proposalId] = '';
    this.hideCommentSection(proposalId);
  }

  // **MÉTHODES UTILITAIRES**

  // Ajouter une activité
  addActivity(type: Activity['type'], message: string) {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type,
      message,
      date: new Date().toLocaleString('fr-FR'),
    };

    this.activities.unshift(newActivity);

    // Garder seulement les 10 dernières activités
    if (this.activities.length > 10) {
      this.activities = this.activities.slice(0, 10);
    }
  }

  // Notifier l'étudiant (à implémenter avec votre service)
  notifyStudent(
    student: Student,
    action: 'validation' | 'rejection',
    proposalTitle: string,
    comment?: string
  ) {
    // Ici vous pouvez implémenter l'appel à votre service de notification
    // Par exemple: this.notificationService.sendNotification(...)

    const notification = {
      studentId: student.id,
      studentEmail: student.email,
      action,
      proposalTitle,
      comment,
      timestamp: new Date().toISOString(),
    };

    console.log('Notification à envoyer:', notification);

    // Exemple d'implémentation:
    // this.emailService.sendNotificationEmail(notification);
    // this.websocketService.sendRealTimeNotification(notification);
  }

  // Obtenir la classe CSS pour le statut
  getStatusClass(status: string): string {
    switch (status) {
      case 'pending':
        return 'status-pending';
      case 'validated':
        return 'status-validated';
      case 'rejected':
        return 'status-rejected';
      default:
        return '';
    }
  }

  // Obtenir le texte du statut
  getStatusText(status: string): string {
    switch (status) {
      case 'pending':
        return 'En attente';
      case 'validated':
        return 'Validé';
      case 'rejected':
        return 'Rejeté';
      default:
        return status;
    }
  }

  // Obtenir l'icône de l'activité
  getActivityIcon(type: string): string {
    switch (type) {
      case 'new_proposal':
        return '📝';
      case 'reminder':
        return '⏰';
      case 'validation':
        return '✅';
      case 'rejection':
        return '❌';
      default:
        return '📋';
    }
  }

  // Vérifier si une proposition peut être modifiée
  canModifyProposal(status: string): boolean {
    return status === 'pending';
  }

  // Obtenir le nombre de caractères restants pour un commentaire
  getRemainingCharacters(proposalId: string, maxLength = 500): number {
    const comment = this.comments[proposalId] || '';
    return maxLength - comment.length;
  }
}
