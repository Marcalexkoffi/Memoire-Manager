import { Component, type OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProposalService, ProposalPayload } from '../services/proposal.service';
import { AuthenticationService } from '../services/authentication.service';

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
  status: 'pendnging' | 'validated' | 'rejected';
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
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './professor-dashboad.component.html',
  styleUrl: './professor-dashboad.component.scss',
})
export class ProfessorDashboadComponent implements OnInit {
  professorName: string = '';

  statistics: Statistics = {
    total: 0,
    pending: 0,
    validated: 0,
    rejected: 0,
  };

  proposals: Array<any> = [];
  filteredProposals: Proposal[] = [];

  activities: Activity[] = [];

  showCommentSection: { [key: string]: boolean } = {};
  comments: { [key: string]: string } = {};

  statusFilter = 'all';
  domainFilter = 'all';
  searchTerm = '';

  memoires: Array<any> = [];
  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.getAllProposals().subscribe({
      next: (proposals) => {
        this.proposals = proposals.memoires;
        console.log(this.proposals);
      },
      error: (error) => console.error(),
    });
  }

  formatDate(date: string): string {
    const d = new Date(date);
    const formattedDate = d.getDay() + "/" + d.getMonth() + "/" + d.getFullYear();

    return formattedDate;
  }

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

  // validateProposal(proposalId: string) {
  //   const proposal = this.proposals.find((p) => p.id === proposalId);
  //   if (!proposal || proposal.status !== 'pending') return;

  //   this.proposalService.validateProposal(proposalId).subscribe({
  //     next: () => {
  //       proposal.status = 'validated';
  //       this.updateStatistics();
  //       this.applyFilters();
  //       this.addActivity(
  //         'validation',
  //         `Proposition "${proposal.title}" validée pour ${proposal.student.name}`
  //       );
  //       this.hideCommentSection(proposalId);
  //       this.notifyStudent(proposal.student, 'validation', proposal.title);
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors de la validation', err);
  //     },
  //   });
  // }

  // rejectProposal(proposalId: string) {
  //   const comment = this.comments[proposalId];
  //   if (!comment || comment.trim() === '') {
  //     alert('Un commentaire est obligatoire pour rejeter une proposition.');
  //     return;
  //   }

  //   const proposal = this.proposals.find((p) => p.id === proposalId);
  //   if (!proposal || proposal.status !== 'pending') return;

  //   this.proposalService.rejectProposal(proposalId, comment.trim()).subscribe({
  //     next: () => {
  //       proposal.status = 'rejected';
  //       proposal.comment = comment.trim();
  //       this.updateStatistics();
  //       this.applyFilters();
  //       this.addActivity(
  //         'rejection',
  //         `Proposition "${proposal.title}" rejetée pour ${proposal.student.name}`
  //       );
  //       this.hideCommentSection(proposalId);
  //       this.comments[proposalId] = '';
  //       this.notifyStudent(
  //         proposal.student,
  //         'rejection',
  //         proposal.title,
  //         comment
  //       );
  //     },
  //     error: (err) => {
  //       console.error('Erreur lors du rejet', err);
  //     },
  //   });
  // }

  toggleCommentSection(proposalId: string) {
    this.showCommentSection[proposalId] = !this.showCommentSection[proposalId];
    if (this.showCommentSection[proposalId] && !this.comments[proposalId]) {
      this.comments[proposalId] = '';
    }
  }

  hideCommentSection(proposalId: string) {
    this.showCommentSection[proposalId] = false;
  }

  // confirmRejection(proposalId: string) {
  //   this.rejectProposal(proposalId);
  // }

  cancelComment(proposalId: string) {
    this.comments[proposalId] = '';
    this.hideCommentSection(proposalId);
  }

  addActivity(type: Activity['type'], message: string) {
    const newActivity: Activity = {
      id: Date.now().toString(),
      type,
      message,
      date: new Date().toLocaleString('fr-FR'),
    };
    this.activities.unshift(newActivity);
    if (this.activities.length > 10) {
      this.activities = this.activities.slice(0, 10);
    }
  }

  notifyStudent(
    student: Student,
    action: 'validation' | 'rejection',
    proposalTitle: string,
    comment?: string
  ) {
    const notification = {
      studentId: student.id,
      studentEmail: student.email,
      action,
      proposalTitle,
      comment,
      timestamp: new Date().toISOString(),
    };

    console.log('Notification à envoyer:', notification);
  }

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

  canModifyProposal(status: string): boolean {
    return status === 'En attente';
  }

  getRemainingCharacters(proposalId: string, maxLength = 500): number {
    const comment = this.comments[proposalId] || '';
    return maxLength - comment.length;
  }
}
